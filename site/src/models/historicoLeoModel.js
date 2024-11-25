var database = require("../database/config")

function cadastrarMes() {
    console.log("ACESSEI O ESTAÇÂO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarMes():");

    var instrucaoSql =
        `SELECT MONTH(data_hora) AS mes, COUNT(id) FROM alerta GROUP BY MONTH(data_hora);`
        ;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrarDia() {
    console.log("ACESSEI O ESTAÇÂO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarDia():");

    var instrucaoSql =
        `SELECT 
    @rownum := @rownum + 1 AS id,  
    CONCAT(
    'Do dia ', 
    intervalo_inicio,  
    ' até o dia ', 
    intervalo_fim  
    ) AS intervalo_dias,
    qtd AS total_registros
    FROM (
    SELECT 
    (FLOOR((DAY(data_hora) - 1) / 7) * 7) + 1 AS intervalo_inicio,
    LEAST((FLOOR((DAY(data_hora) - 1) / 7) * 7) + 7, DAY(LAST_DAY(data_hora))) AS intervalo_fim,
    count(*) as qtd
    FROM alerta
    WHERE MONTH(data_hora) = MONTH(CURDATE())  
    GROUP BY intervalo_fim, intervalo_inicio   
    ORDER BY intervalo_inicio ASC  
    ) AS intervalos, (SELECT @rownum := 0) r  
    GROUP BY intervalo_fim, intervalo_inicio 
    ORDER BY intervalo_inicio ASC; 
`
        ;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrarRanking() {
    console.log("ACESSEI O ESTAÇÂO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarRanking():");

    var instrucaoSql =
        `SELECT a.fk_totem as totem, t.mac_address as idTotem, COUNT(*) AS total_alertas
        FROM alerta a
        JOIN totem t ON a.fk_totem = t.id
        GROUP BY a.fk_totem, t.mac_address 
        order by total_alertas desc limit 5;`
        ;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrarTaxa() {
    console.log("ACESSEI O ESTAÇÂO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarTaxa():");

    var instrucaoSql =
        `
    SELECT 
    DATE(data_hora) AS dia,
    COUNT(*) AS total_alerta,
    ROUND((COUNT(*) / (SELECT COUNT(*) FROM alerta WHERE data_hora >= CURDATE() - INTERVAL 7 DAY) * 100), 2) AS taxa_porcentagem
    FROM alerta
    WHERE data_hora >= CURDATE() - INTERVAL 7 DAY
    GROUP BY dia
    ORDER BY dia limit 7;`
        ;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrarHora() {
    console.log("ACESSEI O ESTAÇÂO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarHora():");

    var instrucaoSql =
        `
    SELECT 
    HOUR(data_hora) AS hora,
    COUNT(*) AS total_alertas
    FROM alerta
    WHERE DATE(data_hora) = '2024-12-12'
    GROUP BY hora
    ORDER BY hora limit 8;  `
        ;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function atualizarMesRanking(mes) {
    console.log("ACESSEI O ESTAÇÂO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function atualizarMesRanking():");
    console.log(mes)
    var instrucaoSql =
        `
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

 `
        ;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function atualizarMesEspecifico(mes) {
    console.log("ACESSEI O ESTAÇÂO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function atualizarMesEspecifico():");

    var instrucaoSql =
        `
    SELECT 
    data_hora AS hora,
    COUNT(*) AS total_alertas
    FROM alerta
    WHERE MONTH(data_hora) = ${mes}
    GROUP BY hora
    ORDER BY hora
    limit 5;
 `
        ;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function atualizarMesTaxa(mes) {
    console.log("ACESSEI O ESTAÇÂO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function atualizarMesTaxa():");

    var instrucaoSql =
        `
    SELECT 
    DATE(data_hora) AS dia,
    (COUNT(*) * 100.0 / (SELECT COUNT(*) 
    FROM alerta 
    WHERE DATE(data_hora) BETWEEN '2024-12-01' AND '2024-12-07')) AS taxa_porcentagem
    FROM alerta
    WHERE MONTH(data_hora) = ${mes}
    GROUP BY DATE(data_hora)
    ORDER BY dia
    limit 7;
 `
        ;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    cadastrarMes,
    cadastrarDia,
    cadastrarRanking,
    cadastrarTaxa,
    cadastrarHora,
    atualizarMesRanking,
    atualizarMesEspecifico,
    atualizarMesTaxa
};