// maquinaModel.js:

// dependências:
//   importação do arquivo `config.js`:
const database = require("../database/config.js");

// declaração da função `cadastrar`:
function cadastrar(hostname, fk_empresa) {
  // declaração da variável de instrução sql:
  const instrucao = `insert into maquina (hostname, fk_empresa) values ('${hostname}', '${fk_empresa}');`;
  // declaração da variável de resultado da execução:
  const resultado = database.executar(instrucao);
  // retorna o resultado da execução:
  return resultado;
}

// declaração da função `listar`:
function listar(fk_empresa) {
  // declaração da variável de instrução sql:
  const instrucao = `select id, hostname, fk_empresa from maquina where fk_empresa = '${fk_empresa}';`;
  // declaração da variável de resultado da execução:
  const resultado = database.executar(instrucao);
  // retorna o resultado da execução:
  return resultado;
}

// exporta as funções do arquivo `maquinaModel.js`:
module.exports = {
  cadastrar,
  listar,
};
