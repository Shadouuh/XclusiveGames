const { createConnection, handleError, express } = require('./../config/setup');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const secretKey = process.env.SECRET_KEY;

// Número de salt rounds para bcrypt (10-12 es recomendado para producción)
const SALT_ROUNDS = 10;

let conex;

//funcion asicrona para crear la conexion a la base de datos (sintaxix epiquisima)
const init = async () => conex = await createConnection();
init();

// funcion para validar
const validateInput = (input, type = 'text') => {
    if (!input || typeof input !== 'string') return false;
    
    switch (type) {
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(input) && input.length <= 255;
        case 'password':
            // minimo de 6 caracteres, maximo 128 (antes del hash)
            return input.length >= 6 && input.length <= 128;
        case 'nick':
            const nickRegex = "";
            return nickRegex.test(input) && input.length >= 3 && input.length <= 50;
        default:
            return input.length > 0 && input.length <= 255;
    }
};

router.post('/login', async (req, res) => {
    const { nickOrEmail, password } = req.body;
    
    // validacion hasheo
    if (!validateInput(nickOrEmail) || !validateInput(password, 'password')) {
        return handleError(res, 'Datos de entrada inválidos', null, 400);
    }
    
    try {
        // statement para q no nos hackeen
        const [resultLogin] = await conex.execute(
            "SELECT * FROM login WHERE (email = ? OR nick = ?) LIMIT 1",
            [nickOrEmail, nickOrEmail]
        );
        
        if (resultLogin.length === 0) {
            return handleError(res, 'Credenciales incorrectas', null, 401);
        }
        
        const user = resultLogin[0];
        
        // comparar contraseña hasheada con bcrypt
        const isPasswordValid = await bcrypt.compare(password, user.password);
        
        if (!isPasswordValid) {
            return handleError(res, 'Credenciales incorrectas', null, 401);
        }
        
        // Crear el token JWT
        const token = jwt.sign(
            {
                id_login: user.id_login,
                nick: user.nick,
                email: user.email,
            },
            secretKey,
            { expiresIn: '24h' }
        );
        
        // Enviar el token como cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // true en producción
            maxAge: 24 * 60 * 60 * 1000, // 24 horas
            sameSite: 'strict'
        });
        
        console.log('Usuario logueado:', user.nick);
        
        res.status(200).json({ 
            message: 'Se logueó correctamente', 
            user: { 
                id_login: user.id_login,
                nick: user.nick,
                email: user.email 
            }
        });
        
    } catch (err) {
        console.error('Error en login:', err);
        return handleError(res, 'Error al intentar iniciar sesión', err);
    }
});

router.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Sesión cerrada correctamente' });
});

router.post('/register', async (req, res) => {
    const { email, password, nick } = req.body;
    
    // validacion de email y contraseña
    if (!validateInput(email, 'email')) {
        return handleError(res, 'Email inválido', null, 400);
    }
    
    if (!validateInput(password, 'password')) {
        return handleError(res, 'La contraseña debe tener entre 6 y 128 caracteres', null, 400);
    }
    
    
    try {
        // Hash de la contraseña antes de almacenarla
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
        
        // statemen de nuevo
        const query = "INSERT INTO login(email, password, nick) VALUES (?, ?, ?)";
        const [resultRegistro] = await conex.execute(query, [email, hashedPassword, nick]);
        
        console.log('Usuario registrado:', nick);
        
        res.status(201).json({
            message: 'Usuario registrado correctamente',
            userId: resultRegistro.insertId
        });
        
    } catch (err) {
        console.error('Error en registro:', err);
        
        if (err.code === 'ER_DUP_ENTRY') {
            return handleError(res, 'El email y/o usuario ya se encuentran registrados', null, 409);
        }
        
        return handleError(res, 'Error al registrarse', err);
    }
});

// Middleware para verificar token (opcional, para usar en otras rutas)
const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    
    if (!token) {
        return handleError(res, 'Token de acceso requerido', null, 401);
    }
    
    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded;
        next();
    } catch (err) {
        return handleError(res, 'Token inválido', null, 401);
    }
};

// Ruta para verificar si el usuario está autenticado
router.get('/verify', verifyToken, (req, res) => {
    res.status(200).json({ 
        message: 'Token válido', 
        user: req.user 
    });
});

module.exports = router;