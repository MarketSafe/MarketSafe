// filialModel.js:

// dependências:
//   importação do arquivo `config.js`:
const database = require("../database/config.js");

// declaração da função `cadastrar`:
function cadastrar(fk_empresa, fk_endereco) {
  // declaração da variável de instrução sql:
  const instrucao = `insert into filial (fk_empresa, fk_endereco) values (${fk_empresa}, ${fk_endereco});`;
  // declaração da variável de resultado da execução:
  const resultado = database.executar(instrucao);
  // retorna o resultado da execução:
  return resultado;
}

// declaração da função `listar`:
function listar(fk_empresa) {
  // declaração da variável de instrução sql:
  const instrucao = `select filial.id as filialId, filial.data_hora as filialDataHora, endereco.cep as enderecoCep, endereco.bairro as enderecoBairro, endereco.rua as enderecoRua, endereco.numero as enderecoNumero, endereco.complemento as enderecoComplemento from filial join endereco on filial.fk_endereco = endereco.id where fk_empresa = '${fk_empresa}';`;
  // declaração da variável de resultado da execução:
  const resultado = database.executar(instrucao);
  // retorna o resultado da execução:
  return resultado;
}

// exporta as funções do arquivo `filialModel.js`:
module.exports = {
  cadastrar,
  listar,
};
