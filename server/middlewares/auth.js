const { handleError } = require('../config/setup');
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;

function verificarToken(req, res, next) {
    const token = req.cookies.token;

    if (!token) return handleError(res, 'No se encontró el token en las cookies', null, 401);

    try {
        const userData = jwt.verify(token, secretKey);
        console.log('Token decodificado en el servidor:', userData);
        req.user = userData;
        next();
    } catch (err) {
        return handleError(res, `Token inválido o expirado: ${err.message}`, err, 403);
    }
}

module.exports = { verificarToken };
