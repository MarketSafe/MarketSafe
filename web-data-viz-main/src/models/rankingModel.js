const database = require('../database/config');


function atualizarTabela(limite_linhas) {
    const instrucaoSql = `
    SELECT p.nome AS promocao, COUNT(a.id) AS qtd_alertas
    FROM promocao p
    JOIN alerta a ON p.id = a.fk_promocao
    GROUP BY p.id
    ORDER BY qtd_alertas DESC 
    LIMIT ${limite_linhas};
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    return database.executar(instrucaoSql, [limite_linhas]);
}

function Obterclassificacao() {
    const instrucaoSql = `
        SELECT p.nome AS promocao, COUNT(a.id) AS qtd_alertas
        FROM promocao p
        JOIN alerta a ON p.id = a.fk_promocao
        GROUP BY p.id
        ORDER BY qtd_alertas DESC
    `;
    return database.executar(instrucaoSql);
}


module.exports = {
    atualizarTabela,
    Obterclassificacao
};
