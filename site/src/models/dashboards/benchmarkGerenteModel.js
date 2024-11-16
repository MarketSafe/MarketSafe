// filialModel.js:

// dependências:
//   importa o arquivo `config.js`:
const database = require("../../database/config.js");

// declara a função `estadoFiliais`:
function estadoFiliais(fk_empresa) {
  // declara a variável de instrução sql:
  const instrucao = `select count(f.id) quantidadeFiliais from filial f join totem t on f.id = t.fk_filial join alerta a on t.id = a.fk_totem where f.fk_empresa = '${fk_empresa}' and a.status = "ativo" group by filial`;
  // declara a variável de resultado da execução:
  const resultado = database.executar(instrucao);
  // retorna o resultado da execução:
  return resultado;
}

// exporta as funções do arquivo `filialModel.js`:
module.exports = {
  estadoFiliais,
};
