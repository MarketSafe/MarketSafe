var database = require("../../database/config");

function puxarDadosLine(idFilial, idEmpresa, anoMes) {
    console.log("ACESSEI O PREVISÃO GERENTE MODEL \n \n\t\t >> Se aqui der erro de 'Error; connect ECONNREFUSED', \n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD esta rodando corretamente. \n\n function puxarDadosLine()");

    var instrucaoSql = `
    SELECT f.nome AS filial_nome, DAY(a.data_hora) AS dia, COUNT(a.id) AS qtd_alertas FROM filial f 
    LEFT JOIN empresa e ON e.id = f.fk_empresa
    LEFT JOIN totem t ON f.id = t.fk_filial
    LEFT JOIN alerta a ON t.id = a.fk_totem
    WHERE a.data_hora >= TIMESTAMP("${anoMes}-01") 
    AND a.data_hora < TIMESTAMP("${anoMes}-01") + INTERVAL 1 MONTH
    AND f.id = ${idFilial} 
    AND e.id = ${idEmpresa}
    GROUP BY dia
    ORDER BY dia DESC;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function plotarRanking(idEmpresa) {
    console.log("ACESSEI O PREVISÃO GERENTE MODEL \n \n\t\t >> Se aqui der erro de 'Error; connect ECONNREFUSED', \n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD esta rodando corretamente. \n\n function plotarRanking()");

    // var instrucaoSql = `
    // TO-DO: Criar um SELECT que funcione pra isso XD`;

    // console.log("Execuntando a instrução SQL: \n" + instrucaoSql);
    // return database.executar(instrucaoSql);
}

function puxarDadosBubble(idFilial, idEmpresa, anoMes, idPromocao) {
    console.log("ACESSEI O PREVISÃO GERENTE MODEL \n \n\t\t >> Se aqui der erro de 'Error; connect ECONNREFUSED', \n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD esta rodando corretamente. \n\n function puxarDadosBubble()");

    var instrucaoSql = `
    SELECT f.nome AS filial_nome, DAY(a.data_hora) AS dia, COUNT(a.id) AS qtd_alertas, p.nome AS promocao_nome FROM filial f 
    LEFT JOIN empresa e ON e.id = f.fk_empresa
    LEFT JOIN totem t ON f.id = t.fk_filial
    LEFT JOIN promocao p ON f.id = p.fk_filial  
    LEFT JOIN alerta a ON t.id = a.fk_totem
    WHERE a.data_hora >= TIMESTAMP("${anoMes}-01") 
    AND a.data_hora < TIMESTAMP("${anoMes}-01") + INTERVAL 1 MONTH
    AND f.id = ${idFilial} 
    AND e.id = ${idEmpresa}
    AND p.id = ${idPromocao}
    GROUP BY dia
    ORDER BY dia DESC;
`;

    console.log("Execuntando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    puxarDadosLine,
    puxarDadosBubble,
    plotarRanking
}