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
  execultarComandoSQL('SELECT * FROM produto', [], res, "Erro na consulta do produto");
});

// Rota para buscar uma produto específica
router.get("/:id", (req, res) => {
  const id = req.params.id;
  execultarComandoSQL('SELECT * FROM produto WHERE id = ?', [id], res, "Erro na consulta do produto");
});

// Rota para criar um novo produto
router.post('/', (req, res) => {
  const { NoProduto, Descricao, Preço, Validade } = req.body;
  execultarComandoSQL('INSERT INTO produto (NoProduto, Descricao, Preço, Validade) VALUES (?, ?, ?, ?)', [NoProduto, Descricao, Preço, Validade], res, "Erro no cadastro de produto!");
});

// Rota para deletar uma produto
router.delete("/:id", (req, res) => {
  const ProdutoId = req.params.id;
  execultarComandoSQL('DELETE FROM produto WHERE id = ?', [ProdutoId], res, 'Erro ao deletar produto');
});

// Rota para atualizar uma produto
router.put('/', (req, res) => {
  const { id, NoProduto, Descricao, Preço, Validade } = req.body;
  execultarComandoSQL('UPDATE produto SET NoProduto = ?, Descricao = ?, Preço = ?, Validade = ? WHERE id = ?', [NoProduto, Descricao, Preço, Validade, id], res, "Erro ao atualizar produto");
});

module.exports = router;