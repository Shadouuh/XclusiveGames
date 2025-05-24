const mysql = require('mysql2/promise');

async function createConnection() {
    try {
        const conex = await mysql.createPool({
            host: "localhost",
            user: "root",
            password: "",
            database: process.env.DB_NAME,
            port: "3306",
            waitForConnections: true,
            connectionLimit: 3,
            queueLimit: 0
        });

        conex.getConnection()
            .then(() => console.log('Conexión exitosa a la base de datos'))
            .catch(err => console.error('Error al conectar a la base de datos:', err.message));
        return conex;

    } catch (err) {
        console.error('Error en la conexion', err);
    }
};

module.exports = createConnection;