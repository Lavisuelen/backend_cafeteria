const jwt = require('jsonwebtoken');
const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();

// Rota para realização de login
router.post('/', async (req, res) => {
  // Obtenha usuário e senha do corpo da requisição
  const { usuario, senha } = req.body;

  // Aqui, seria necessário buscar o usuário do banco de dados  
  const usuarioBanco = {
    id : "lara",
    senha : "123456"
  }

  // Verifique a senha
  //if (bcrypt.compareSync(senha, usuarioBanco.senha)) {
  if (senha === usuarioBanco.senha){
    // Senha correta, crie um token
    const token = jwt.sign({ id: usuarioBanco.id }, 'IFRN_AUTORIA_WEB', { expiresIn: '1h' });
    res.json({ token });
  } else {
    // Senha incorreta
    res.status(401).json({erro : "Credenciais inválidas"});
  }
});

module.exports = router;
