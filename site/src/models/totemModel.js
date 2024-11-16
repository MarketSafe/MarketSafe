// totemModel.js:

// dependências:
//   importa o arquivo `config.js`:
const database = require("../database/config.js");

// declara a função `cadastrar`:
function cadastrar(mac_address, fk_filial) {
  // declara a variável de instrução sql:
  const instrucao = `insert into totem (mac_address, fk_filial) values ('${mac_address}', '${fk_filial}');`;
  // declara a variável de resultado da execução:
  const resultado = database.executar(instrucao);
  // retorna o resultado da execução:
  return resultado;
}

// declara a função `listar`:
function listarPorFilial(fk_filial) {
  // declara a variável de instrução sql:
  const instrucao = `select id, data_hora, mac_address from totem where fk_filial = '${fk_filial}';`;
  // declara a variável de resultado da execução:
  const resultado = database.executar(instrucao);
  // retorna o resultado da execução:
  return resultado;
}

// declara a função `listar`:
function listarPorEmpresa(fk_empresa) {
  // declara a variável de instrução sql:
  const instrucao = `select id, data_hora, mac_address, fk_filial from totem where fk_empresa = '${fk_empresa}';`;
  // declara a variável de resultado da execução:
  const resultado = database.executar(instrucao);
  // retorna o resultado da execução:
  return resultado;
}

// exporta as funções do arquivo `totemModel.js`:
module.exports = {
  cadastrar,
  listarPorFilial,
  listarPorEmpresa,
};
