// filialModel.js:

// dependências:
//   importa o arquivo `config.js`:
const database = require("../../database/config.js");

// declara a função `estadoFiliais`:
function estadoFiliais(fk_empresa) {
  // declara a variável de instrução sql:
  const instrucao = `select * from quantidade_filial_status;`;
  // declara a variável de resultado da execução:
  const resultado = database.executar(instrucao);
  // retorna o resultado da execução:
  return resultado;
}

// exporta as funções do arquivo `filialModel.js`:
module.exports = {
  estadoFiliais,
};
