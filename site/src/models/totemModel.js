// totemModel.js:

// dependências:
//   importação do arquivo `config.js`:
const database = require("../database/config.js");

// declaração da função `cadastrar`:
function cadastrar(mac_address, fk_filial) {
  // declaração da variável de instrução sql:
  const instrucao = `insert into totem (mac_address, fk_filial) values ('${mac_address}', '${fk_filial}');`;
  // declaração da variável de resultado da execução:
  const resultado = database.executar(instrucao);
  // retorna o resultado da execução:
  return resultado;
}

// declaração da função `listar`:
function listarPorFilial(fk_filial) {
  // declaração da variável de instrução sql:
  const instrucao = `select id, data_hora, mac_address from totem where fk_filial = '${fk_filial}';`;
  // declaração da variável de resultado da execução:
  const resultado = database.executar(instrucao);
  // retorna o resultado da execução:
  return resultado;
}

// declaração da função `listar`:
function listarPorEmpresa(fk_empresa) {
  // declaração da variável de instrução sql:
  const instrucao = `select id, data_hora, mac_address, fk_filial from totem where fk_empresa = '${fk_empresa}';`;
  // declaração da variável de resultado da execução:
  const resultado = database.executar(instrucao);
  // retorna o resultado da execução:
  return resultado;
}



// declaração da função `listarAlertaPorTotem`:
function listarAlertaPorTotem(totem, componente, inicio, fim) {
  // declaração da variável de instrução sql:
  const instrucao = `select * from alerta where '${componente}'_porcentagem > 85 and fk_totem = '${totem}' and data_hora > '${inicio} 00:00:00' AND data_hora < '${fim} 23:59:59';`;
  // declaração da variável de resultado da execução:
  const resultado = database.executar(instrucao);
  // retorna o resultado da execução:
  return resultado;
}


// exporta as funções do arquivo `totemModel.js`:
module.exports = {
  cadastrar,
  listarPorFilial,
  listarPorEmpresa,
  listarAlertaPorTotem,
};
