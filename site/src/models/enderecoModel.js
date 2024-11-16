// enderecoModel.js:

// dependências:
//   importa o arquivo `config.js`:
const database = require("../database/config.js");

// declara a função `cadastrar`:
function cadastrar(cep, bairro, rua, numero, complemento) {
  // declara a variável de instrução sql:
  let instrucao = `insert into endereco (cep, bairro, rua, numero, complemento) values ('${cep}', '${bairro}', '${rua}', ${numero}, '${complemento}');`;
  // declara a variável de resultado da execução:
  let resultado = database.executar(instrucao);
  // retorna o resultado da execução:
  return resultado;
}

// exporta as funções do arquivo `enderecoModel.js`:
module.exports = {
  cadastrar,
};
