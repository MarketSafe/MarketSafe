// alertaModel.js:

// dependências:
//   importa o arquivo `config.js`:
const database = require("../database/config.js");

// declara a função `listarPorFilial`:
function listarPorFilial(fk_filial) {
  // declara a variável de instrução sql:
  const instrucao = `select a.id as alertaId, a.data_hora as alertaDataHora, a.cpu_porcentagem as alertaCpuPorcentagem, a.ram_porcentagem as alertaRamPorcentagem, t.mac_address as totemMacAddress from alerta as a join totem as t on a.fk_totem = t.id where t.fk_filial = '${fk_filial}';`;
  // declara a variável de resultado da execução:
  const resultado = database.executar(instrucao);
  // retorna o resultado da execução:
  return resultado;
}

// declara a função `listarPorEmpresa`:
function listarPorEmpresa(fk_empresa) {
  // declara a variável de instrução sql:
  const instrucao = `select a.id as alertaId, a.data_hora as alertaDataHora, a.cpu_porcentagem as alertaCpuPorcentagem, a.ram_porcentagem as alertaRamPorcentagem, t.mac_address as totemMacAddress, f.id as filialId from alerta as a join totem as t on a.fk_totem = t.id join filial as f on t.fk_filial = f.id where f.fk_empresa = '${fk_empresa}';`;
  console.log(instrucao);
  // declara a variável de resultado da execução:
  const resultado = database.executar(instrucao);
  // retorna o resultado da execução:
  return resultado;
}

// exporta as funções do arquivo `alertaModel.js`:
module.exports = {
  listarPorFilial,
  listarPorEmpresa,
};
