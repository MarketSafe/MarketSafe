// filialModel.js:

// dependências:
//   importa o arquivo `config.js`:
const database = require("../database/config.js");

// declara a função `cadastrar`:
function cadastrar(fk_empresa, fk_endereco) {
  // declara a variável de instrução sql:
  const instrucao = `insert into filial (fk_empresa, fk_endereco) values (${fk_empresa}, ${fk_endereco});`;
  // declara a variável de resultado da execução:
  const resultado = database.executar(instrucao);
  // retorna o resultado da execução:
  return resultado;
}

// declara a função `listar`:
function listar(fk_empresa) {
  // declara a variável de instrução sql:
  const instrucao = `select f.id as filialId, f.nome as nome, f.data_hora as filialDataHora, f.fk_promocao_ativa, e.cep as enderecoCep, e.bairro as enderecoBairro, e.rua as enderecoRua, e.numero as enderecoNumero, e.complemento as enderecoComplemento from filial f join endereco e on f.fk_endereco = e.id where f.fk_empresa = ${fk_empresa} order by f.id;`;
  // declara a variável de resultado da execução:
  const resultado = database.executar(instrucao);
  // retorna o resultado da execução:
  return resultado;
}


// exporta as funções do arquivo `filialModel.js`:
module.exports = {
  cadastrar,
  listar,
};
