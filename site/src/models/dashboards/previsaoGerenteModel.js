var database = require("../../database/config");

function puxarDadosLine(idFilial, idEmpresa) {
    console.log("ACESSEI O PREVISÃO GERENTE MODEL \n \n\t\t >> Se aqui der erro de 'Error; connect ECONNREFUSED', \n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD esta rodando corretamente. \n\n function puxarDadosLine()");

    var instrucaoSql = `
    SELECT f.nome AS filial_nome, MONTH(a.data_hora) AS mes, COUNT(a.id) AS qtd_alertas FROM filial f 
    LEFT JOIN empresa e ON e.id = f.fk_empresa
    LEFT JOIN totem t ON f.id = t.fk_filial
    LEFT JOIN alerta a ON t.id = a.fk_totem
    WHERE f.id = ${idFilial}
    AND e.id = ${idEmpresa}
    GROUP BY mes
    ORDER BY mes DESC;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function plotarRanking() {
    console.log("ACESSEI O PREVISÃO GERENTE MODEL \n \n\t\t >> Se aqui der erro de 'Error; connect ECONNREFUSED', \n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD esta rodando corretamente. \n\n function plotarRanking()");

    var instrucaoSql = `
    WITH RankedFiliais AS (
    SELECT f.id AS filial_id, f.nome AS filial, p.nome AS promocao, COUNT(a.id) AS quantidade_alertas,
        ROW_NUMBER() OVER (PARTITION BY f.id ORDER BY COUNT(a.id) DESC) AS row_num
    FROM filial f
    JOIN promocao p ON f.id = p.fk_filial
    LEFT JOIN alerta a ON p.id = a.fk_promocao
    GROUP BY f.id, f.nome, p.nome
    )

    SELECT filial, promocao, quantidade_alertas FROM RankedFiliais
    WHERE row_num = 1
    ORDER BY quantidade_alertas DESC
    LIMIT 3;`;

    console.log("Execuntando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function puxarDadosBubble(idFilial, idEmpresa, idPromocao) {
    console.log("ACESSEI O PREVISÃO GERENTE MODEL \n \n\t\t >> Se aqui der erro de 'Error; connect ECONNREFUSED', \n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD esta rodando corretamente. \n\n function puxarDadosBubble()");

    var instrucaoSql = `
    SELECT f.nome AS filial_nome, MONTH(a.data_hora) AS mes, COUNT(a.id) AS qtd_alertas, p.nome AS promocao_nome FROM filial f 
    LEFT JOIN empresa e ON e.id = f.fk_empresa
    LEFT JOIN totem t ON f.id = t.fk_filial
    LEFT JOIN promocao p ON f.id = p.fk_filial  
    LEFT JOIN alerta a ON t.id = a.fk_totem
    WHERE f.id = ${idFilial}
    AND e.id = ${idEmpresa}
    AND p.id = ${idPromocao}
    GROUP BY mes
    ORDER BY mes DESC;
`;

    console.log("Execuntando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function puxarFiliais(idEmpresa) {
    console.log("ACESSEI O PREVISÃO GERENTE MODEL \n \n\t\t >> Se aqui der erro de 'Error; connect ECONNREFUSED', \n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD esta rodando corretamente. \n\n function puxarFiliais()");

    var instrucaoSql = `
    SELECT * FROM filial WHERE fk_empresa = ${idEmpresa};`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function puxarPromocoes(idFilial) {
    console.log("ACESSEI O PREVISÃO GERENTE MODEL \n \n\t\t >> Se aqui der erro de 'Error; connect ECONNREFUSED', \n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD esta rodando corretamente. \n\n function puxarPromocoes()");

    var instrucaoSql = `
    SELECT * FROM promocao WHERE fk_filial = ${idFilial};`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    puxarDadosLine,
    puxarDadosBubble,
    plotarRanking,
    puxarFiliais,
    puxarPromocoes
}