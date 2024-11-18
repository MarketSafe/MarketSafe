// config.js:

// dependências:
//   importa a biblioteca "mysql2":
const mysql = require("mysql2");

// configurações de conexão (já definidas préviamente no "app.js" por meio do arquivo ".env" ou ".env.dev"):
const mySqlConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};

// declara a função `executar`:
function executar(instrucao) {
  // caso o ambiente não esteja configurado no arquivo ".env", ".env.dev" ou no início do arquivo "app.js", rejeita a execução, retornando um erro:
  if (process.env.AMBIENTE_PROCESSO !== "producao" && process.env.AMBIENTE_PROCESSO !== "desenvolvimento") {
    console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM .env OU dev.env OU app.js\n");
    return Promise.reject("AMBIENTE NÃO CONFIGURADO EM .env");
  }
  // caso contrário, continua a execução do código:

  // retorna uma promessa, que será cumprida em algum momento, retornando uma resposta ou um erro:
  return new Promise(function (resolve, reject) {
    // declara a variável de conexão:
    const conexao = mysql.createConnection(mySqlConfig);

    // conecta com o banco utilizando as configurações definidas:
    conexao.connect();

    // executa a instrução passada para a função:
    conexao.query(instrucao, function (erro, resultados) {
      // caso a execução resulte em um erro, a variável `erro` será preenchida com algum valor
      // caso a execução possua um resultado, a variável `resultados` será preenchida com algum valor

      // após executar a instrução, finaliza a conexão:
      conexao.end();

      // caso a variável de erro possua algum valor, retorna um erro:
      if (erro) {
        reject(erro);
      }
      // caso contrário, continua a execução do código:

      // retorna os resultados da instrução executada:
      resolve(resultados);
    });

    // caso algum erro aconteça entre a conexão e a execução da instrução, retorna o erro:
    conexao.on("error", function (erro) {
      return { erro: `ERRO NO MySQL SERVER: ${erro.sqlMessage}` };
    });
  });
}

// exporta a função executar do arquivo `config.js`:
module.exports = {
  executar,
};
