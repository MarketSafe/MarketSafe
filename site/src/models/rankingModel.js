const database = require("../database/config");

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

function statusFiliaisHistorico(mes) {
  // declara a variável de instrução sql:
  const instrucao = `SELECT
    filial_id,
    CASE
        WHEN semana_1 = 0 THEN 'normal'
        WHEN semana_1 = 1 THEN 'critico'
        ELSE 'atencao'
    END AS semana_1_status,
    CASE
        WHEN semana_2 = 0 THEN 'normal'
        WHEN semana_2 = 1 THEN 'critico'
        ELSE 'atencao'
    END AS semana_2_status,
    CASE
        WHEN semana_3 = 0 THEN 'normal'
        WHEN semana_3 = 1 THEN 'critico'
        ELSE 'atencao'
    END AS semana_3_status,
    CASE
        WHEN semana_4 = 0 THEN 'normal'
        WHEN semana_4 = 1 THEN 'critico'
        ELSE 'atencao'
    END AS semana_4_status
FROM (
    SELECT
        f.id AS filial_id,
        CASE
            WHEN SUM(CASE WHEN DAY(ta.data_hora) <= 7 THEN 1 ELSE 0 END) > 0 THEN 1
            ELSE 0
        END AS semana_1,
        CASE
            WHEN SUM(CASE WHEN DAY(ta.data_hora) BETWEEN 8 AND 14 THEN 1 ELSE 0 END) > 0 THEN 1
            ELSE 0
        END AS semana_2,
        CASE
            WHEN SUM(CASE WHEN DAY(ta.data_hora) BETWEEN 15 AND 21 THEN 1 ELSE 0 END) > 0 THEN 1
            ELSE 0
        END AS semana_3,
        CASE
            WHEN SUM(CASE WHEN DAY(ta.data_hora) >= 22 THEN 1 ELSE 0 END) > 0 THEN 1
            ELSE 0
        END AS semana_4
    FROM filial f
    LEFT JOIN (
        SELECT
            t.fk_filial,
            a.data_hora
        FROM totem t
        LEFT JOIN alerta a ON t.id = a.fk_totem
    ) ta ON f.id = ta.fk_filial
    AND DATE_FORMAT(ta.data_hora, '%Y-%m') = '${mes}'
    GROUP BY f.id
) AS result;`;
  // declara a variável de resultado da execução:
  const resultado = database.executar(instrucao);
  // retorna o resultado da execução:
  return resultado;
}

function cardQtdAlerta(fk_filial, mes) {
  const instrucaoSql = `
   SELECT
    f.nome AS filial_nome,
    COUNT(a.id) AS qtd_alertas
FROM filial f
LEFT JOIN totem t ON f.id = t.fk_filial
LEFT JOIN alerta a ON t.id = a.fk_totem
WHERE DATE_FORMAT(a.data_hora, '%Y-%m') = '${mes}'
AND f.id = ${fk_filial}  
GROUP BY f.id;
    `;
  //    console.log(instrucaoSql)

  return database.executar(instrucaoSql);
}

module.exports = {
  buscarPorFilial,
  atualizarTabela,
  Obterclassificacao,
  statusFiliais,
  alertasMensal,
  statusFiliaisHistorico,
  cardQtdAlerta,
};
