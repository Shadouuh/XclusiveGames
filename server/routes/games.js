const { createConnection, handleError, express } = require('./../config/setup');
const router = express.Router();
const upload = require('../middlewares/upload');
const { uploadToCloudinary } = require('../utils/cloudinary');


let conex;
//funcion asicrona para crear la conexion a la base de datos (sintaxix epiquisima)
const init = async () => conex = await createConnection();
init();

//Crear juego
router.post('/create', upload.single('file'), async (req, res) => {

    const { name, price, description, release_date, stock, genres, platforms, minimos, recomendados } = req.body;

    const genresArray = JSON.parse(genres);
    const platformsArray = JSON.parse(platforms);
    const minReqs = JSON.parse(minimos);
    const recReqs = JSON.parse(recomendados);

    try {

        let imgUrl = null;
        if (req.file) {
            const result = await uploadToCloudinary(req.file.buffer, 'img_games');
            imgUrl = result.secure_url;
        }

        const query = `INSERT INTO games (name, price, description, release_date, stock, status) VALUES (?, ?, ?, ?, ?, ?)`;

        const [resultGame] = await conex.query(query, [name, price, description, release_date, stock, stock > 0]);

        const gameID = resultGame.insertId

        for (let genre of genresArray) {

            const query = 'INSERT INTO games_genres (id_game, id_genre) VALUES (?,?)';
            await conex.query(query, [gameID, genre]);

        }

        for (let platform of platformsArray) {

            const query = 'INSERT INTO games_platforms (id_game, id_platform) VALUES (?,?)';
            await conex.query(query, [gameID, platform]);

        }

        await conex.query(
            "INSERT INTO requeriments (id_game, tipo, procesador, memoria, graficos, almacenamiento) VALUES (?, 'minimos', ?, ?, ?, ?)",
            [gameID, minReqs.procesador, minReqs.memoria, minReqs.graficos, minReqs.almacenamiento]
        );


        await conex.query(
            "INSERT INTO requeriments (id_game, tipo, procesador, memoria, graficos, almacenamiento) VALUES (?, 'recomendados', ?, ?, ?, ?)",
            [gameID, recReqs.procesador, recReqs.memoria, recReqs.graficos, recReqs.almacenamiento]
        );

        if (imgUrl) {
            await conex.query(
                "INSERT INTO games_imgs  (id_game, url)  VALUES (?, ?)",
                [gameID, imgUrl]
            );
        }

        res.status(201).send({

            message: "Juego creado correctamente",
            gameID: resultGame.insertId,
            imageUrl: imgUrl

        });

    } catch (err) {

        if (err.code === 'ER_DUP_ENTRY') {

            return handleError(res, 'El juego ya se enceuentra registrado', null, 409);

        }

        console.error(err);
        return handleError(res, 'Error al crear el juego', err);

    }

});

//Traer juego por ID
router.get('/getById/:id', async (req, res) => {
    const gameId = req.params.id;

    try {
        const [game] = await conex.query('SELECT * FROM games WHERE id_game = ? AND deleted_at IS NULL', [gameId]);

        if (game.length == 0) return handleError(res, 'No se encontro el juego', null, 404);

        const gameData = game[0];

        const [genres] = await conex.query(`
            SELECT g.name FROM genres g
            JOIN games_genres gg ON g.id_genre = gg.id_genre WHERE gg.id_game = ? `,
            [gameData.id_game]
        );

        gameData.genres = genres.map(g => g.name);

        const [platforms] = await conex.query(`
            SELECT p.name FROM platforms p
            JOIN games_platforms gp ON p.id_platform = gp.id_platform WHERE gp.id_game = ?`,
            [gameData.id_game]
        );

        gameData.platforms = platforms.map(p => p.name);

       
        const [requeriments] = await conex.query(`
            SELECT tipo, procesador, memoria, graficos, almacenamiento
            FROM requeriments
            WHERE id_game = ?`,     
            [gameData.id_game]
        );

        gameData.min_requeriment = requeriments.find(r => r.tipo === 'minimos') || {};
        gameData.rec_requeriment = requeriments.find(r => r.tipo === 'recomendados') || {};;

        const [reviews] = await conex.query(
            'SELECT AVG(score) FROM reviews WHERE id_game = ?',
            [gameData.id_game]
        );

        gameData.score = reviews.length > 0 ? reviews[0]['AVG(score)'] : 0;

        const [images] = await conex.query(`
            SELECT url FROM games_imgs WHERE id_game = ?`,
            [gameData.id_game]
        );

        gameData.images = images.map(img => img.url);

        res.status(200).json({ game: gameData });

    } catch (err) {

        return handleError(res, 'Error al obtener el juego', err);
    }
})

//Traer todos los juegos
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

            const [reviews] = await conex.query(
                'SELECT AVG(score) FROM reviews WHERE id_game = ?',
                [game.id_game]
            );

            game.score = reviews[0]['AVG(score)'] || 0;

            const [images] = await conex.query(`
                SELECT url FROM games_imgs WHERE id_game = ?`,
                [game.id_game]
            );

            game.image = images.length > 0 ? images[0].url : null;
        }

        res.status(200).json({ games });


    } catch (err) {
        return handleError(res, 'Error al obtener los juegos', err);
    }
});

//Actualizar Jeugoooo
router.put('/update/:id', upload.single('file'), async (req, res) => {
    const { name, price, description, release_date, stock, genres, platforms, minimos, recomendados, existImg } = req.body;

    const gameId = req.params.id;

    try {

        let imgUrl = existImg;
        if (req.file) {
            const result = await uploadToCloudinary(req.file.buffer, 'img_games');
            imgUrl = result.secure_url;
        }

        const query = "UPDATE games SET name = ?, price = ?, description = ?, release_date = ?, stock = ?, status = ?, img = ? WHERE id_game = ?";
        const [resultGame] = await conex.execute(query, [name, price, description, release_date, stock, stock > 0, imgUrl, gameId]);

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

        await conex.query('DELETE FROM requeriments WHERE id_game = ?', [gameId]);

        await conex.query(
            "INSERT INTO requeriments (id_game, tipo, procesador, memoria, graficos, almacenamiento) VALUES (?, 'minimos', ?, ?, ?, ?)",
            [gameId, minimos.procesador, minimos.memoria, minimos.graficos, minimos.almacenamiento]
        );

        await conex.query(
            "INSERT INTO requeriments (id_game, tipo, procesador, memoria, graficos, almacenamiento) VALUES (?, 'recomendados', ?, ?, ?, ?)",
            [gameId, recomendados.procesador, recomendados.memoria, recomendados.graficos, recomendados.almacenamiento]
        );


        res.status(200).send({

            message: "Juego actualizado correctamente",
            game: resultGame

        })

    } catch (err) {
        return handleError(res, 'Error al actualizar el juego', err);
    }

});

//Eliminar juego
router.delete('/delete/:id', async (req, res) => {
    try {

        const query = "UPDATE games SET deleted_at = NOW() WHERE id_game = ?";
        await conex.execute(query, [req.params.id]);

        res.status(200).send({

            message: 'JUego eliminado correctamente',
            gameId: req.params.id

        });

    } catch (err) {
        return handleError(res, 'Error al eliminar el juego', err);
    }

});

module.exports = router;

