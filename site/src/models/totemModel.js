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



// declaração da função `listarAlertaPorTotem`:
function listarAlertaPorTotem(totem, componente, inicio, fim) {
  // declaração da variável de instrução sql:
  const instrucao = `select * from alerta where ${componente}_porcentagem > 85 and fk_totem = '${totem}' and data_hora > '${inicio} 00:00:00' AND data_hora < '${fim} 23:59:59';`;
  // declaração da variável de resultado da execução:
  const resultado = database.executar(instrucao);
  // retorna o resultado da execução:

  // declaração da variável de instrução sql:
  const instrucao2 = `SELECT 
    dias_semana.dia AS DIA_SEMANA,
    COALESCE(COUNT(alerta.id), 0) AS qtd
FROM 
    (SELECT 1 AS dia UNION ALL
     SELECT 2 UNION ALL
     SELECT 3 UNION ALL
     SELECT 4 UNION ALL
     SELECT 5 UNION ALL
     SELECT 6 UNION ALL
     SELECT 7) AS dias_semana
LEFT JOIN 
    alerta ON DATE_FORMAT(alerta.data_hora, '%w') = dias_semana.dia
GROUP BY 
    dias_semana.dia
ORDER BY 
    FIELD(dias_semana.dia, 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday');`;
  // declaração da variável de resultado da execução:
  const resultado2 = database.executar(instrucao2);

  const resultadoFinal = {
    resultado,
    resultado2
  }
  // retorna o resultado da execução:
  return resultadoFinal;
}


// exporta as funções do arquivo `totemModel.js`:
module.exports = {
  cadastrar,
  listarPorFilial,
  listarPorEmpresa,
  listarAlertaPorTotem,
};
