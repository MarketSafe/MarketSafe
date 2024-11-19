const database = require('../database/config');

function buscarPorFilial(filialId) {
    const instrucaoSql = `
        SELECT f.id AS filial_id, p.nome AS promocao,COUNT(a.id) AS qtd_alertas
        FROM filial f JOIN promocao p ON f.id = p.fk_filial LEFT JOIN alerta a ON p.id = a.fk_promocao
        WHERE f.id = ${filialId} GROUP BY f.id, p.nome ORDER BY qtd_alertas DESC LIMIT 3;
    `;

    

    return database.executar(instrucaoSql, [filialId]);
}


function atualizarTabela(limite_linhas) {
    const instrucaoSql = `
        SELECT p.nome AS promocao, COUNT(a.id) AS qtd_alertas
        FROM promocao p
        JOIN alerta a ON p.id = a.fk_promocao
        GROUP BY p.id
        ORDER BY qtd_alertas DESC 
        LIMIT ${limite_linhas};
    `;


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

function statusFiliais() {
    // declara a variável de instrução sql:
    const instrucao = `select f.id, f.nome, "critico" as status from filial f join totem t on f.id = t.fk_filial join alerta a on t.id = a.fk_totem group by f.id having  count(a.id) > 10 union
    select f.id, f.nome, "atencao" as status from filial f join totem t on f.id = t.fk_filial join alerta a on t.id = a.fk_totem group by f.id having  count(a.id) <= 10 union
    select f.id, f.nome, "normal" as status from filial f left join totem t on f.id = t.fk_filial left join alerta a on t.id = a.fk_totem group by f.id having count(a.id) = 0`;
    // declara a variável de resultado da execução:
    const resultado = database.executar(instrucao);
    // retorna o resultado da execução:
    return resultado;
}

function alertasMensal(fk_filial, mes) {
    const instrucaoSql = `
    select date_format(data_hora, "%w") dia , count(id) qtdAlertas from
    (select a.id, a.data_hora from filial f
    join totem t on t.fk_filial = f.id
    join alerta a on a.fk_totem = t.id
    where f.id = ${fk_filial} and date_format(a.data_hora, '%Y-%m') = '${mes}') as s group by date_format(data_hora, "%w");
    `;
//    console.log(instrucaoSql)

    return database.executar(instrucaoSql);
}

module.exports = {
    buscarPorFilial,
    atualizarTabela,
    Obterclassificacao,
    statusFiliais,
    alertasMensal
};
