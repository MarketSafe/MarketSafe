// funcionarioModel.js:

// dependências:
//   importação do arquivo `config.js`:
const database = require("../database/config.js");

// declaração da função `autenticar`:
function autenticar(email, senha) {
  // declaração da variável de instrução sql:
  const instrucao = `select id, data_hora, nome, cpf, cargo, email, senha, telefone, fk_empresa FROM funcionario where email = '${email}' and senha = '${senha}';`;
  // declaração da variável de resultado da execução:
  const resultado = database.executar(instrucao);
  // retorna o resultado da execução:
  return resultado;
}

// declaração da função `cadastrar`:
function cadastrar(nome, cpf, cargo, email, senha, telefone, fk_empresa) {
  // declaração da variável de instrução sql:
  const instrucao = `insert into funcionario (nome, cpf, cargo, email, senha, telefone, fk_empresa) values ('${nome}', '${cpf}', '${cargo}', '${email}', '${senha}', '${telefone}', '${fk_empresa}');`;
  // declaração da variável de resultado da execução:
  const resultado = database.executar(instrucao);
  // retorna o resultado da execução:
  return resultado;
}

// declaração da função `cadastrarPorFilial`:
function cadastrarPorFilial(nome, cpf, cargo, email, senha, telefone, fk_empresa, fk_filial) {
  // declaração da variável de instrução sql:
  const instrucao = `insert into funcionario (nome, cpf, cargo, email, senha, telefone, fk_empresa, fk_filial) values ('${nome}', '${cpf}', '${cargo}', '${email}', '${senha}', '${telefone}', '${fk_empresa}', '${fk_filial}');`;
  // declaração da variável de resultado da execução:
  const resultado = database.executar(instrucao);
  // retorna o resultado da execução:
  return resultado;
}

// exporta as funções do arquivo `funcionarioModel.js`:
module.exports = {
  autenticar,
  cadastrar,
  cadastrarPorFilial,
};
