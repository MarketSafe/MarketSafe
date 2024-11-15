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
    COUNT(*) AS total_registros
FROM (
    SELECT 
        (FLOOR((DAY(data_hora) - 1) / 7) * 7) + 1 AS intervalo_inicio,
        LEAST((FLOOR((DAY(data_hora) - 1) / 7) * 7) + 7, DAY(LAST_DAY(data_hora))) AS intervalo_fim
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

module.exports = {
    cadastrarMes,
    cadastrarDia
};