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

  rangeDias = []
  cont = 0
  var date = inicio.split("-");
  dayI = parseInt(date[2]);

  var dateD = fim.split("-");
  dayF = parseInt(dateD[2]);

  unions = `SELECT ${dayI} AS dia UNION ALL `

  for (let i = dayI + 1; i < dayF; i++){
      rangeDias[cont] = i
      cont = cont + 1;

      unions += `SELECT ${i} UNION ALL `
      
  }
  
  unions += `SELECT ${dayF}`

  // declaração da variável de instrução sql:
  const instrucao = `SELECT 
    dias_mes.dia AS DIA_MES,
    COALESCE(COUNT(alerta.id), 0) AS qtd
FROM 
    (${unions}) AS dias_mes
LEFT JOIN 
    alerta ON DATE_FORMAT(alerta.data_hora, '%d') = dias_mes.dia
    and ${componente}_porcentagem > 85 
    and fk_totem = ${totem} 
    and data_hora > '${inicio} 00:00:00' 
    AND data_hora < '${fim} 23:59:59'
GROUP BY 
    dias_mes.dia;`;

    // console.log(instrucao);


  // declaração da variável de resultado da execução:
  const resultado = database.executar(instrucao);
  // retorna o resultado da execução:
    resultado
  // retorna o resultado da execução:
  return resultado;
}

// declaração da função `listarAlertaPorTotem`:
function listarAlertaPorTotemPorDiaDaSemana(totem, componente, inicio, fim, hi, hf) {
  // declaração da variável de instrução sql:
  const instrucao = `SELECT 
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
    and ${componente}_porcentagem > 85 
    and fk_totem = ${totem} 
    and data_hora > '${inicio} 00:00:00' 
    AND data_hora < '${fim} 23:59:59'
    and TIME(data_hora) > '${hi}:00'
    and TIME(data_hora) < '${hf}:00'
GROUP BY 
    dias_semana.dia
ORDER BY 
    FIELD(dias_semana.dia, 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday');`;
  // declaração da variável de resultado da execução:
  const resultado = database.executar(instrucao);

    resultado
  // retorna o resultado da execução:
  return resultado;
}


// declaração da função `listarAlertaPorTotem`:
function listarTodosAlertas() {
  // declaração da variável de instrução sql:
  const instrucao = `SELECT 
    t.totem AS totem, 
    COALESCE(COUNT(a.id), 0) AS qtd
FROM 
    (SELECT 1 AS totem 
     UNION ALL 
     SELECT 2) AS t
LEFT JOIN 
    alerta a 
ON 
    a.fk_totem = t.totem
    AND a.data_hora >= DATE(NOW()) - INTERVAL 30 DAY 
    AND a.data_hora <= DATE(NOW())
GROUP BY 
    t.totem
ORDER BY 
    t.totem;`;
  // declaração da variável de resultado da execução:
  const resultado = database.executar(instrucao);

    resultado
  // retorna o resultado da execução:
  return resultado;
}

function listarTodosAlertasPorTotem(totem1, totem2, inicio, fim) {
  // declaração da variável de instrução sql:
  const instrucao = `SELECT 
    t.totem AS totem, 
    COALESCE(COUNT(a.id), 0) AS qtd
FROM 
    (SELECT ${totem1} AS totem 
     UNION ALL 
     SELECT ${totem2}) AS t
LEFT JOIN 
    alerta a 
ON 
    a.fk_totem = t.totem
    AND a.data_hora >= '${inicio} 00:00:00'
    AND a.data_hora <= '${fim} 23:59:59'
WHERE 
    t.totem IN (${totem1}, ${totem2})
GROUP BY 
    t.totem
ORDER BY 
    t.totem;`;
  // declaração da variável de resultado da execução:
  const resultado = database.executar(instrucao);

    resultado
  // retorna o resultado da execução:
  return resultado;
}



// exporta as funções do arquivo `totemModel.js`:
module.exports = {
  cadastrar,
  listarPorFilial,
  listarPorEmpresa,
  listarAlertaPorTotem,
  listarAlertaPorTotemPorDiaDaSemana,
  listarTodosAlertas,
  listarTodosAlertasPorTotem
};
