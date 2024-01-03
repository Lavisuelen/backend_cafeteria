const express = require('express');
const router = express.Router();
const db = require('../util/db');
const verificarToken = require('../util/VerificaToken');

/**
 * Executa uma consulta no banco de dados e envia uma resposta.
 * @param {string} sql - A consulta SQL a ser executada.
 * @param {Array} params - Os parâmetros para a consulta SQL.
 * @param {Object} res - O objeto de resposta do Express.
 * @param {string} erroMsg - Mensagem de erro para ser enviada em caso de falha.
 */
function execultarComandoSQL(sql, params, res, erroMsg) {
  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(500).json({ erro: erroMsg, detalhes: err });
    } else {
      res.status(200).json(result);
    }
  });
}

// Rota para buscar todas as tarefas
router.get('/', (req, res) => {
  execultarComandoSQL('SELECT * FROM cargo', [], res, "Erro na consulta do cargo");
});

// Rota para buscar uma cargo específica
router.get("/:id", (req, res) => {
  const id = req.params.id;
  execultarComandoSQL('SELECT * FROM cargo WHERE id = ?', [id], res, "Erro na consulta do cargo");
});

// Rota para criar um novo cargo
router.post('/', (req, res) => {
  const { NoCargo, Descricao, Salario } = req.body;
  execultarComandoSQL('INSERT INTO cargo (NoCargo, Descricao, Salario) VALUES (?, ?, ?)', [NoCargo, Descricao, Salario], res, "Erro no cadastro de cargo!");
});

// Rota para deletar uma cargo
router.delete("/:id", (req, res) => {
  const CargoId = req.params.id;
  execultarComandoSQL('DELETE FROM cargo WHERE id = ?', [CargoId], res, 'Erro ao deletar cargo');
});

// Rota para atualizar uma cargo
router.put('/', (req, res) => {
  const { id, NoCargo, Descricao, Salario } = req.body;
  execultarComandoSQL('UPDATE cargo SET NoCargo = ?, Descricao = ?, Salario = ? WHERE id = ?', [NoCargo, Descricao, Salario, id], res, "Erro ao atualizar cargo");
});

module.exports = router;