const mysql = require('mysql');

// Obtém a senha do banco de dados a partir de variáveis de ambiente ou usa um valor padrão vazio.
const senhaBanco = process.env.SENHA_BANCO || "";

// Cria a configuração de conexão com o banco de dados.
const configConexao = {
  host: 'localhost',
  user: 'root',
  password: senhaBanco,
  database: 'cafeteria'
};

// Cria a conexão com o banco de dados.
const connection = mysql.createConnection(configConexao);

/**
 * Conecta ao banco de dados MySQL e gerencia erros de conexão.
 */
connection.connect(err => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados MySQL:', err);
    // Pode-se adicionar mais lógica de tratamento de erros aqui, como reconexão.
    process.exit(1); // Encerra a aplicação em caso de erro de conexão.
  }
  console.log('Conectado ao banco de dados MySQL!');
});

module.exports = connection;
