const { createConnection, handleError, express } = require('./../config/setup');
const router = express.Router();

let conex;
// Función asíncrona para crear la conexión a la base de datos
const init = async () => conex = await createConnection();
init();

// Obtener el carrito del usuario
router.get('/getById/:id_login', async (req, res) => {
    const userId = req.params.id_login;

    try {
        
        // Primero obtenemos el id_user a partir del id_login
        const [userResult] = await conex.execute(
            "SELECT id_user FROM users WHERE id_login = ?",
            [userId]
        );
        
        if (userResult.length === 0) return handleError(res, 'Usuario no encontrado', null, 404);
        
        const id_user = userResult[0].id_user;
        
        // Obtenemos los items del carrito con información de los juegos
        const [cartItems] = await conex.execute(
            `SELECT c.id_cart, c.id_user, c.id_game, c.quantity, c.added_at, 
                    g.name, g.price, g.description, g.release_date, g.stock, g.status
             FROM cart c
             JOIN games g ON c.id_game = g.id_game
             WHERE c.id_user = ?`,
            [id_user]
        );
        
        // Obtenemos los géneros y plataformas para cada juego
        for (let item of cartItems) {
            // Obtener géneros
            const [genres] = await conex.execute(
                `SELECT g.name FROM genres g
                 JOIN games_genres gg ON g.id_genre = gg.id_genre 
                 WHERE gg.id_game = ?`,
                [item.id_game]
            );
            item.genres = genres.map(g => g.name);
            
            // Obtener plataformas
            const [platforms] = await conex.execute(
                `SELECT p.name FROM platforms p
                 JOIN games_platforms gp ON p.id_platform = gp.id_platform 
                 WHERE gp.id_game = ?`,
                [item.id_game]
            );
            item.platforms = platforms.map(p => p.name);
        }
        res.status(200).json({cartItems});
    } catch (err) {
        return handleError(res, 'Error al obtener el carrito', err);
    }
});

// Agregar un juego al carrito
router.post('/add/:id_game', async (req, res) => {
    const { quantity = quantity || 1 } = req.body;
    const { id_game } = req.params;
    const userId = req.body.id_login; 
    
    try {

        console.log('Body: ', req.body);
        console.log('Params: ', req.params);
        
        // Primero obtenemos el id_user a partir del id_login
        const [userResult] = await conex.execute(
            "SELECT id_user FROM users WHERE id_login = ?",
            [userId]
        );
        
        if (userResult.length === 0) return handleError(res, 'Usuario no encontrado', null, 404);
        
        const id_user = userResult[0].id_user;
        
        // Verificamos si el juego existe
        const [gameResult] = await conex.execute(
            "SELECT id_game FROM games WHERE id_game = ?",
            [id_game]
        );
        
        if (gameResult.length === 0) return handleError(res, 'Juego no encontrado', null, 404);
        
        // Verificamos si el juego ya está en el carrito
        const [cartResult] = await conex.execute(
            "SELECT id_cart, quantity FROM cart WHERE id_user = ? AND id_game = ?",
            [id_user, id_game]
        );
        
        if (cartResult.length > 0) {
            // Si ya existe, actualizamos la cantidad
            const newQuantity = cartResult[0].quantity + quantity;
            
            await conex.execute(
                "UPDATE cart SET quantity = ? WHERE id_cart = ?",
                [newQuantity, cartResult[0].id_cart]
            );
            
            res.status(200).json({
                message: 'Cantidad actualizada en el carrito',
                id_cart: cartResult[0].id_cart,
                quantity: newQuantity
            });
        } else {
            // Si no existe, lo agregamos al carrito
            const [insertResult] = await conex.execute(
                "INSERT INTO cart (id_user, id_game, quantity) VALUES (?, ?, ?)",
                [id_user, id_game, quantity]
            );
            
            res.status(201).json({
                message: 'Juego agregado al carrito',
                id_cart: insertResult.insertId,
                quantity
            });
        }
    } catch (err) {
        return handleError(res, 'Error al agregar al carrito', err);
    }
});

// Actualizar cantidad de un juego en el carrito
router.put('/update/:id_cart', async (req, res) => {
    const { id_cart } = req.params;
    const { quantity } = req.body;
    
    if (!quantity || quantity < 1) {
        return handleError(res, 'La cantidad debe ser al menos 1', null, 400);
    }
    
    try {
        const userId = req.user.id_login;
        
        // Primero obtenemos el id_user a partir del id_login
        const [userResult] = await conex.execute(
            "SELECT id_user FROM users WHERE id_login = ?",
            [userId]
        );
        
        if (userResult.length === 0) {
            return handleError(res, 'Usuario no encontrado', null, 404);
        }
        
        const id_user = userResult[0].id_user;
        
        // Verificamos que el item del carrito pertenezca al usuario
        const [cartResult] = await conex.execute(
            "SELECT id_cart FROM cart WHERE id_cart = ? AND id_user = ?",
            [id_cart, id_user]
        );
        
        if (cartResult.length === 0) {
            return handleError(res, 'Item no encontrado en el carrito', null, 404);
        }
        
        // Actualizamos la cantidad
        await conex.execute(
            "UPDATE cart SET quantity = ? WHERE id_cart = ?",
            [quantity, id_cart]
        );
        
        res.status(200).json({
            message: 'Cantidad actualizada',
            id_cart,
            quantity
        });
    } catch (err) {
        return handleError(res, 'Error al actualizar el carrito', err);
    }
});

// Eliminar un juego del carrito
router.delete('/remove/:id_cart', async (req, res) => {
    const { id_cart } = req.params;
    
    try {
        const userId = req.user.id_login;
        
        // Primero obtenemos el id_user a partir del id_login
        const [userResult] = await conex.execute(
            "SELECT id_user FROM users WHERE id_login = ?",
            [userId]
        );
        
        if (userResult.length === 0) {
            return handleError(res, 'Usuario no encontrado', null, 404);
        }
        
        const id_user = userResult[0].id_user;
        
        // Verificamos que el item del carrito pertenezca al usuario
        const [cartResult] = await conex.execute(
            "SELECT id_cart FROM cart WHERE id_cart = ? AND id_user = ?",
            [id_cart, id_user]
        );
        
        if (cartResult.length === 0) {
            return handleError(res, 'Item no encontrado en el carrito', null, 404);
        }
        
        // Eliminamos el item del carrito
        await conex.execute(
            "DELETE FROM cart WHERE id_cart = ?",
            [id_cart]
        );
        
        res.status(200).json({
            message: 'Item eliminado del carrito',
            id_cart
        });
    } catch (err) {
        return handleError(res, 'Error al eliminar del carrito', err);
    }
});

// Vaciar el carrito
router.delete('/clear', async (req, res) => {
    try {
        const userId = req.user.id_login;
        
        // Primero obtenemos el id_user a partir del id_login
        const [userResult] = await conex.execute(
            "SELECT id_user FROM users WHERE id_login = ?",
            [userId]
        );
        
        if (userResult.length === 0) {
            return handleError(res, 'Usuario no encontrado', null, 404);
        }
        
        const id_user = userResult[0].id_user;
        
        // Eliminamos todos los items del carrito del usuario
        await conex.execute(
            "DELETE FROM cart WHERE id_user = ?",
            [id_user]
        );
        
        res.status(200).json({
            message: 'Carrito vaciado correctamente'
        });
    } catch (err) {
        return handleError(res, 'Error al vaciar el carrito', err);
    }
});

module.exports = router;