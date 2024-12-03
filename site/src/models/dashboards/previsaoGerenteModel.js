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
    select
  f.*,
  sum(t.quantidade_alerta) quantidade_alerta
  from filial f
  left join (
        select
        t.*,
        ifnull(a.quantidade_alerta, 0) quantidade_alerta
        from totem t
        left join (
            select
            count(a.id) quantidade_alerta,
            a.fk_totem
            from alerta a
            where date(a.data_hora) = date("${anoMes}-15")
             and a.fk_promocao = ${idPromocao}
            group by a.fk_totem
        ) a
            on t.id = a.fk_totem
  ) t on f.id = t.fk_filial
  where f.fk_empresa = ${idEmpresa}
  and f.id = ${idFilial}
  group by f.id;
`;

    console.log("Execuntando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    puxarDadosLine,
    puxarDadosBubble,
    plotarRanking
}