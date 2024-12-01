var database = require("../database/config");

async function cadastrarMes() {
  // console.log("ACESSEI O ESTAÇÂO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarMes():");

  var instrucaoSql = `SELECT MONTH(data_hora) AS mes, COUNT(id) FROM alerta GROUP BY MONTH(data_hora);`;
  // console.log("Executando a instrução SQL: \n" + instrucaoSql);
  // console.log(instrucaoSql);
  const resultado = await database.executar(instrucaoSql);
  // console.log(resultado);
  return resultado;
}

function cadastrarDiaInicio() {
  // console.log("ACESSEI O ESTAÇÂO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarDiaInicio():");

  var instrucaoSql = `
  SELECT DAY(data_hora) AS dia_alerta, COUNT(*) AS total_alertas
  FROM alerta
  GROUP BY dia_alerta
  ORDER BY dia_alerta;
`;
  // console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function cadastrarDiaFim() {
  // console.log("ACESSEI O ESTAÇÂO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarDiaFim():");

  var instrucaoSql = `
  SELECT DAY(data_hora) AS dia_alerta, COUNT(*) AS total_alertas
  FROM alerta
  GROUP BY dia_alerta
  ORDER BY dia_alerta;
`;
  // console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function cadastrarRanking() {
  // console.log("ACESSEI O ESTAÇÂO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarRanking():");

  var instrucaoSql = `SELECT a.fk_totem as totem, t.mac_address as idTotem, COUNT(*) AS total_alertas
        FROM alerta a
        JOIN totem t ON a.fk_totem = t.id
        GROUP BY a.fk_totem, t.mac_address 
        order by total_alertas desc limit 5;`;
  // console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function cadastrarTaxa() {
  // console.log("ACESSEI O ESTAÇÂO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarTaxa():");

  var instrucaoSql = `
    SELECT 
    DATE(data_hora) AS dia,
    COUNT(*) AS total_alerta,
    ROUND((COUNT(*) / (SELECT COUNT(*) FROM alerta WHERE data_hora >= CURDATE() - INTERVAL 7 DAY) * 100), 2) AS taxa_porcentagem
    FROM alerta
    WHERE data_hora >= CURDATE() - INTERVAL 7 DAY
    GROUP BY dia
    ORDER BY dia limit 7;`;
  // console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function cadastrarHora() {
  // console.log("ACESSEI O ESTAÇÂO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarHora():");

  var instrucaoSql = `
    SELECT 
    HOUR(data_hora) AS hora,
    COUNT(*) AS total_alertas
    FROM alerta
    WHERE DATE(data_hora) = '2024-12-12'
    GROUP BY hora
    ORDER BY hora limit 8;  `;
  // console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function atualizarMesRanking(mes) {
  // console.log("ACESSEI O ESTAÇÂO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function atualizarMesRanking():");
  // console.log(mes)
  var instrucaoSql = `
    SELECT 
    a.fk_totem as totem, 
    t.mac_address as idTotem, 
    COUNT(*) AS total_alertas
    FROM alerta a
    JOIN totem t ON a.fk_totem = t.id
    WHERE MONTH(a.data_hora) = ${mes}
    GROUP BY a.fk_totem, t.mac_address
    ORDER BY total_alertas DESC
    LIMIT 5;

 `;
  // console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function atualizarMesEspecifico(mes) {
  // console.log("ACESSEI O ESTAÇÂO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function atualizarMesEspecifico():");

  var instrucaoSql = `
    SELECT 
    hour(data_hora) AS hora,
    COUNT(*) AS total_alertas
    FROM alerta
    WHERE MONTH(data_hora) = ${mes}
    GROUP BY hora
    ORDER BY hora
    limit 5;
 `;
  // console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function atualizarMesTaxa(mes) {
  // console.log("ACESSEI O ESTAÇÂO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function atualizarMesTaxa():");

  var instrucaoSql = `
    SELECT 
    DATE(data_hora) AS dia,
    (COUNT(*) * 100.0 / NULLIF(
    (SELECT COUNT(*) 
    FROM alerta 
    WHERE DATE(data_hora) BETWEEN '2024-${mes}-07' AND '2024-${mes}-14'), 0
    )) AS taxa_porcentagem
    FROM alerta
    WHERE DATE(data_hora) BETWEEN '2024-${mes}-07' AND '2024-${mes}-14'
    GROUP BY DATE(data_hora)
    ORDER BY dia
    LIMIT 7;
 `;
  // console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function maisAlerta() {
  // console.log("ACESSEI O ESTAÇÂO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function maisAlerta():");

  var instrucaoSql = `
    SELECT 
    HOUR(data_hora) AS hora, 
    COUNT(*) AS total_alertas
    FROM 
    alerta
    WHERE 
    MONTH(data_hora) = 10
    GROUP BY 
    HOUR(data_hora)
    ORDER BY 
    total_alertas DESC
    LIMIT 1;
 `;
  // console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function atualizarMaisAlerta(mes) {
  // console.log("ACESSEI O ESTAÇÂO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function atualizarMaisAlerta():");

  var instrucaoSql = `
    SELECT 
    HOUR(data_hora) AS hora, 
    COUNT(*) AS total_alertas
    FROM 
    alerta
    WHERE 
    MONTH(data_hora) = ${mes}
    GROUP BY 
    HOUR(data_hora)
    ORDER BY 
    total_alertas DESC
    LIMIT 1;
 `;
  // console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function alertaSemana() {
  // console.log("ACESSEI O ESTAÇÂO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function alertaSemana():");

  var instrucaoSql = `
    SELECT 
    DATE_FORMAT(data_hora, '%d/%m') AS dia_mes,
    COUNT(*) AS total_alertas
    FROM 
    alerta
    WHERE 
    MONTH(data_hora) = 10
    AND YEAR(data_hora) = 2024
    GROUP BY 
    DATE_FORMAT(data_hora, '%d/%m')
    ORDER BY 
    total_alertas DESC
    LIMIT 1;
 `;
  // console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function atualizarAlertaSemana(mes) {
  // console.log("ACESSEI O ESTAÇÂO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function atualizarAlertaSemana():");

  var instrucaoSql = `
    SELECT 
    DATE_FORMAT(data_hora, '%d/%m') AS dia_mes,
    COUNT(*) AS total_alertas
    FROM 
    alerta
    WHERE 
    MONTH(data_hora) = ${mes}
    AND YEAR(data_hora) = 2024
    GROUP BY 
    DATE_FORMAT(data_hora, '%d/%m')
    ORDER BY 
    total_alertas DESC
    LIMIT 1;
 `;
  // console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function mediaHorario() {
  // console.log("ACESSEI O ESTAÇÂO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function mediaHorario():");

  var instrucaoSql = `
    SELECT 
    HOUR(data_hora) AS hora_alerta,
    COUNT(*) AS total_alertas
    FROM 
    alerta
    WHERE 
    MONTH(data_hora) = 08
    GROUP BY 
    HOUR(data_hora)
    ORDER BY 
    total_alertas DESC
    LIMIT 1;
 `;
  // console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function atualizarMediaHorario(mes) {
  // console.log("ACESSEI O ESTAÇÂO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function atualizarMediaHorario():");

  var instrucaoSql = `
    SELECT 
    HOUR(data_hora) AS hora_alerta,
    COUNT(*) AS total_alertas
    FROM 
    alerta
    WHERE 
    MONTH(data_hora) = ${mes}
    GROUP BY 
    HOUR(data_hora)
    ORDER BY 
    total_alertas DESC
    LIMIT 1;
 `;
  // console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
  cadastrarMes,
  cadastrarDiaInicio,
  cadastrarDiaFim,
  cadastrarRanking,
  cadastrarTaxa,
  cadastrarHora,
  atualizarMesRanking,
  atualizarMesEspecifico,
  atualizarMesTaxa,
  maisAlerta,
  atualizarMaisAlerta,
  alertaSemana,
  atualizarAlertaSemana,
  mediaHorario,
  atualizarMediaHorario,
};
