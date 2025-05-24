const { handleError } = require('../config/setup');
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;

function verificarToken(req, res, next) {
  // Buscar la galletita
  const token = req.cookies.token;

  if (!token) handleError(res, 'No se encontró el token', null, 401);

  //Verificar que el token no haya expirado con jwt.verify
  try {

    const userData = jwt.verify(token, secretKey);
     //SI es valido decodifica el token y guarda los datos de los usuarios
    req.user = userData;
    next();

  } catch (err) {
    return handleError(res, 'Token inválido o expirado', null, 403);
  }
}

module.exports = { verificarToken };
