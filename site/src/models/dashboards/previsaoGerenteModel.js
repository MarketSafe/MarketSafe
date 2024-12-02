var database = require("../../database/config");

function puxarDados(idFilial) {
    console.log("ACESSEI O PREVISÃO GERENTE MODEL \n \n\t\t >> Se aqui der erro de 'Error; connect ECONNREFUSED', \n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD esta rodando corretamente. \n\n function puxarDados()");

    var instrucaoSql = `
    SELECT * FROM alerta JOIN totem ON fk_totem = id JOIN filial ON fk_filial = ${idFilial}`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    puxarDados
}