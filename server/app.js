const path = require('path');
const { express } = require(path.join(__dirname, 'config', 'setup'));
const cookieParser = require('cookie-parser');
const cors = require('cors');

process.loadEnvFile();

const app = express();
app.use(cookieParser());
app.use(cors());
app.use(express.json());

// muestra las peticiones en consola
app.use((req, res, next) => {
    console.log(`📌 Recibido: ${req.method} ${req.url}`);
    next();
});

// Rutas
app.use('/api', require(path.join(__dirname, 'routes', 'crud')));
app.use('/user', require(path.join(__dirname, 'routes', 'user')));
app.use('/games', require(path.join(__dirname, 'routes', 'games')));

// Testeo de api
app.get('/ping', async (req, res) => {
    res.send('Pong');
});

const port = process.env.API_PORT || 5001;
app.listen(port, () => console.log(`Server escuchando en el puerto ${port}`));

//despues podemos server los archivos de la build de vite para mostrarlos desde el mismo servidor
