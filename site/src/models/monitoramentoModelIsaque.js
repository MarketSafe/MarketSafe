var database = require("../database/config");

function Atualizar_ValorT1() {
    console.log("Executando a função Atualizar_ValorT1");

    var instrucaoSql = `
        SELECT consumo_cpu 
        FROM alerta 
        WHERE id = 1
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    return database.executar(instrucaoSql); // A função 'executar' deve estar configurada para retornar uma Promise
}

module.exports = {
    Atualizar_ValorT1
};
