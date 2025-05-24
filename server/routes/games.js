const { verificarToken } = require('../middlewares/auth');
const { createConnection, handleError, express } = require('./../config/setup');
const router = express.Router();

let conex;
//funcion asicrona para crear la conexion a la base de datos (sintaxix epiquisima)
const init = async () => conex = await createConnection();
init();

router.post('/createGame', verificarToken, async (req, res) => {

    const { name, price, plataform, genre, description, release_date, stock, status, id_review } = req.body;

    if (!name || !price || !plataform || !genre || !description || !release_date || stock == null || status == null || !id_review) {

        return handleError(res, 'Todos los campos son requeridos', null, 400);

    }

    const gameData = {
        name,
        price,
        plataform,
        genre,
        description,
        release_date,
        stock,
        status,
        id_review
    };

    try {

        const columFields = Object.keys(gameData); //Obtien el nombre de las columnas a insertar
        const columValues = Object.values(gameData);//Obtien los datos COrrespondientes

        const query = `INSERT INTO games (${columFields.join(',')}) VALUES (${columFields.map(() => '?').join(',')})`;

        const [resultGame] = await conex.query(query, columValues);

        res.status(201).send({

            message: "Juego creado correctamente",
            gamID: resultGame.insertId

        });

    } catch (err) {

        if (err.code === 'ER_DUP_ENTRY') {

            return handleError(res, 'El juego ya se enceuentra registrado', null, 409);

        }

        return handleError(res, 'Error al crear el juego', err);

    }

});

router.get('/games', verificarToken, async (req, res) => {

    try {

        const [games] = await conex.query('SELECT * FROM games');

        res.status(200).json(games);

    } catch (err) {

        return handleError(res, 'Error al obtner los juegos', err);

    }

});

router.delete('/deleteGame/:id', verificarToken, async (req, res) => {

    const { id } = req.params;

    if (isNaN(id)) return handleError(res, 'El id no es valido', null, 400);

    try {

        const result = await conex.query('DELETE FROM games WHERE id_games = ?', [id]);

        if (result.affectedRows == 0) return handleError(res, 'JUego no encontrado', null, 404);



        res.status(200).json({ message: 'Juego eliminado correctamente' });

    } catch (err) {

        return handleError(res, 'Erro al eliminar juego', err)

    }

});

router.put('/updateGame/:id', verificarToken, async (req, res) => {

    const { id } = req.params;

    if (isNaN(id)) return handleError(res, 'EL id no es vvalido', null, 400);

    const { name, price, plataform, genre, description, release_date, stock, status, id_review } = req.body;

    try {

        const values = 'UPDATE games SET name = ?, price = ?, plataform = ?, genre = ?, description = ?, release_date = ?, stock = ?, status = ?, id_review = ? WHERE id_games = ?';

        const [result] = await conex.query(query, values);

        if (result.affectedRows == 0) {

            return handleError(res, 'Juego no encontrado', null, 404)

        }

        res.status(200).json({ message: 'Juego actauliado corresctaente' });

    } catch (err) {

        return handleError(res, 'Error a actualixar el juegfo', err)

    }

});


module.exports = router;