// enderecoModel.js:

// dependências:
//   importação do arquivo `config.js`:
const database = require("../database/config.js");

// declaração da função `cadastrar`:
function cadastrar(cep, bairro, rua, numero, complemento) {
  // declaração da variável de instrução sql:
  let instrucao = `insert into endereco (cep, bairro, rua, numero, complemento) values ('${cep}', '${bairro}', '${rua}', ${numero}, '${complemento}');`;
  // declaração da variável de resultado da execução:
  let resultado = database.executar(instrucao);
  // retorna o resultado da execução:
  return resultado;
}

// exporta as funções do arquivo `enderecoModel.js`:
module.exports = {
  cadastrar,
};
