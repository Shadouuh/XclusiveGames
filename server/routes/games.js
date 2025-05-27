const { verificarToken } = require('../middlewares/auth');
const { createConnection, handleError, express } = require('./../config/setup');
const router = express.Router();

let conex;
//funcion asicrona para crear la conexion a la base de datos (sintaxix epiquisima)
const init = async () => conex = await createConnection();
init();

router.post('/create', verificarToken, async (req, res) => {

    const { name, price, description, release_date, stock, genres, platforms } = req.body;

    try {

        const query = `INSERT INTO games (name, price, description, release_data, stock, status) VALUES (?, ?, ?, ?, ?, ?)`;

        const [resultGame] = await conex.query(query, [name, price, description, release_date, stock, stock > 0]);

        const gameID = resultGame.insertID

        for (let genre of genres) {

            const query = 'INSERT INTO games_genres (id_game, id_genre) VALUES (?,?)';
            await conex.query(query, [gameID, genre]);

        }

        for (let platform of platforms) {

            const query = 'INSERT INTO games_platforms (id_game, id_platform) VALUES (?,?)';
            await conex.query(query, [gameID, platform]);

        }

        res.status(201).send({

            message: "Juego creado correctamente",
            gameID: resultGame.insertId

        });

    } catch (err) {

        if (err.code === 'ER_DUP_ENTRY') {

            return handleError(res, 'El juego ya se enceuentra registrado', null, 409);

        }

        console.error(err);
        return handleError(res, 'Error al crear el juego', err);

    }

});

router.get('/all', async (req, res) => {

    try {
        const [games] = await conex.query('SELECT * FROM games WHERE deleted_at IS NULL')

        for (let game of games) {

            const [genres] = await conex.query(`
                SELECT g.name FROM genres g
                JOIN games_genres gg ON g.id_genre = gg.id_genre WHERE gg.id_game = ? `,
                [game.id_game]
            );

            game.genres = genres.map(g => g.name);

            const [platforms] = await conex.query(`
                SELECT p.name FROM platforms p
                JOIN games_platforms gp ON p.id_platform = gp.id_platform WHERE gp.id_game = ?`,
                [game.id_game]
            );

            game.platforms = platforms.map(p => p.name);
        }

        res.status(200).json({games});

    } catch (err) {
        return handleError(res, 'Error al obtener los juegos', err);
    }
});

router.get('/:id', async (req, res) =>{

const gameID = req.params.id;

try{

    const [games] = await conex.query('SELECT * FROM games WHERE id_game = ? AND deleted_at IS NULL', 
        [gameID]
    );

    if(games.length == 0) return handleErro(res, "Jueego no encontrado", null, 404);

    const game = games[0];

    
    const [genres] = await conex.query(`
        SELECT g.name FROM genres g
        JOIN games_genres gg ON g.id_genre = gg.id_genre WHERE gg.id_game = ? `,
        [game.id_game]
    );

    game.genres = genres.map(g => g.name);

    const [platforms] = await conex.query(`
        SELECT p.name FROM platforms p
        JOIN games_platforms gp ON p.id_platform = gp.id_platform WHERE gp.id_game = ?`,
        [game.id_game]
    );

    game.platforms = platforms.map(p => p.name);

    res.status(200).json({games});

} catch (err){
    return handleError(res, 'Error al obtener el juego', err);
}

});


router.put('/updateGame/:id', async (req, res) => {
    const { name, price, description, release_date, stock, genres, platforms } = req.body;

    const gameId = req.params.id;

    try {

        const query = "UPDATE games SET name = ?, price = ?, description = ?, release_date = ?, stock = ?, status = ? WHERE id_game = ?";
        const [resultGame] = await conex.execute(query, [name, price, description, release_date, stock, stock > 0, gameId]);

        //Eliminar y volover a insertar los generos y plataformas
        await conex.query('DELETE FROM games_genres WHERE id_game = ?', [gameId]);
        await conex.query('DELETE FROM games_platforms WHERE id_game = ?', [gameId]);

        for (let genre of genres) {

            await conex.query('INSERT INTO games_genres (id_game, id_genre) VALUES (?, ?)',
            [gameId, genre]);

        }

        for (let platform of platforms) {

            await conex.query('INSERT INTO games_platforms (id_game, id_platform) VALUES (?, ?)',
            [gameId, platform]);

        }

        res.status(201).send({

            message: "Juego actualizado correctamente",
            game: resultGame

        })

    } catch (err) {
        return handleError(res, 'Error al actualizar el juego', err);
    }

});

router.delete('/deleteGame/:id', async (req, res) => {
    try {

        const query = "UPDATE games SET deleted_at = NOW() WHERE id_game = ?";
        await conex.execute(query, [req.params.id]);

        res.status(201).send({

            message: 'JUego eliminado correctamente',
            gameId: req.params.id

        });

    } catch (err) {
        return handleError(res, 'Error al eliminar el juego', err);
    }

});

module.exports = router;

