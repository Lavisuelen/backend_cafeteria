const jwt = require('jsonwebtoken');

function verificarToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).send('Acesso negado');

  try {
    const verificado = jwt.verify(token, 'IFRN_AUTORIA_WEB');
    req.usuario = verificado;
    next(); // passa o controle para a próxima função middleware
  } catch (err) {
    res.status(400).send('Token inválido');
  }
}

module.exports = verificarToken;