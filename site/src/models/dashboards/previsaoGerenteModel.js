var database = require("../../database/config");

function puxarDados(idFilial, empresa, mes) {
    console.log("ACESSEI O PREVISÃO GERENTE MODEL \n \n\t\t >> Se aqui der erro de 'Error; connect ECONNREFUSED', \n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD esta rodando corretamente. \n\n function puxarDados()");

    var instrucaoSql = `
    SELECT f.nome AS filial_nome, COUNT(a.id) AS qtd_alertas FROM filial f
    LEFT JOIN totem t ON f.id = t.fk_filial
    LEFT JOIN alerta a ON t.id = a.fk_totem
    WHERE DATE_FORMAT(a.data_hora, '%Y-%m') = '${mes}'
    AND f.id = ${idFilial}
    GROUP BY f.id;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    puxarDados
}