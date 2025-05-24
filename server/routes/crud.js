const { createConnection, handleError, express } = require('./../config/setup');
const router = express.Router();

let conex;
//funcion asicrona para crear la conexion a la base de datos (sintaxix epiquisima)
const init = async() => conex = await createConnection();
init();

router.get('/all/:table', async (req, res) => {
    const { table } = req.params;

    try {
        const [results] = await conex.query('SELECT * FROM ' + table);

        if (results.length == 0) return handleError(res, 'No se encontraron elementos', null, 404);

        res.status(200).send({ results });
    } catch (err) {
        return handleError(res, 'Error en la consulta de: ' + table, err);
    }
});

router.post('/insert/:table', async (req, res) => {
    const { table } = req.params;
    const { dates } = req.body;

    try {
        const [columns] = await conex.query('DESC ' + table);

        if (columns.length == 0) return handleError(res, 'No se encontraron columnas', null, 404);

        let columnFields = columns.map(col => col.Field);
        let columnValues = columnFields.map(col => dates[col] === undefined ? null : dates[col]);

        columnFields.shift();
        columnValues.shift();

        const query = `INSERT INTO ${table} (${columnFields.join(', ')}) VALUES (${columnFields.map(() => '?').join(', ')})`;
        await conex.execute(query, columnValues);

        res.status(201).send({ message: 'Se insertó correctamente en ' + table });
    } catch (err) {
        return handleError(res, 'Error al insertar los datos en: ' + table, err);
    }
});

router.put('/update/:table/:id', async (req, res) => {
    const { table, id } = req.params;
    const { dates } = req.body;

    try {
        const [columns] = await conex.execute('DESC ' + table);
        const primaryKey = columns.find(col => col.Key == 'PRI').Field;
        const columnFields = columns.map(col => col.Field).slice(1);

        //puede ser que haya un problema, si no se pasa un campo este lo toma como null asi que termina poniendo de null a todos los campos
        let columnValues = columnFields.map(col => dates[col] === undefined ? null : dates[col]);
        

        const query = `UPDATE ${table} SET ${columnFields.join(' = ?, ')} = ? WHERE ${primaryKey} = ?`;
        await conex.execute(query, [...columnValues, id]);

        res.status(200).send({ message: `Elemento con el ${primaryKey} ${id} actualizado` });
    } catch (err) {
        return handleError(res, 'Error al actualizar el elemento de: ' + table, err);
    }
});

router.delete('/remove/:table/:id', async (req, res) => {
    const { table, id } = req.params;

    try {
        const [columns] = await conex.execute('DESC ' + table);
        const primaryKey = columns.find(col => col.Key == 'PRI').Field;

        const query = `DELETE FROM ${table} WHERE ${primaryKey} = ?`;
        const [results] = await conex.execute(query, [id]);

        if (results.affectedRows == 0) return handleError(res, 'Elemento no encontrado', null, 404);

        res.send({ message: `Elemento con el ${primaryKey} ${id} eliminado` });
    } catch (err) {
        return handleError(res, 'Error al eliminar el elemento de: ' +table, err);
    }
});

module.exports = router;    