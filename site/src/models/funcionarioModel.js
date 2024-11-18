// funcionarioModel.js:

// dependências:
//   importa o arquivo `config.js`:
const database = require("../database/config.js");

// declara a função `autenticar`:
function autenticar(email, senha) {
  // declara a variável de instrução sql:
  const instrucao = `select id, data_hora, nome, cpf, cargo, telefone, fk_empresa FROM funcionario where email = '${email}' and senha = '${senha}';`;
  // declara a variável de resultado da execução:
  const resultado = database.executar(instrucao);
  // retorna o resultado da execução:
  return resultado;
}

// declara a função `cadastrar`:
function cadastrar(nome, cpf, cargo, email, senha, telefone, fk_empresa) {
  // declara a variável de instrução sql:
  const instrucao = `insert into funcionario (nome, cpf, cargo, email, senha, telefone, fk_empresa) values ('${nome}', '${cpf}', '${cargo}', '${email}', '${senha}', '${telefone}', '${fk_empresa}');`;
  // declara a variável de resultado da execução:
  const resultado = database.executar(instrucao);
  // retorna o resultado da execução:
  return resultado;
}

// declara a função `cadastrarPorFilial`:
function cadastrarPorFilial(nome, cpf, cargo, email, senha, telefone, fk_empresa, fk_filial) {
  // declara a variável de instrução sql:
  const instrucao = `insert into funcionario (nome, cpf, cargo, email, senha, telefone, fk_empresa, fk_filial) values ('${nome}', '${cpf}', '${cargo}', '${email}', '${senha}', '${telefone}', '${fk_empresa}', '${fk_filial}');`;
  // declara a variável de resultado da execução:
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
