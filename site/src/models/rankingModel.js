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
  //    // console.log(instrucaoSql)

  return database.executar(instrucaoSql);
}

function statusFiliaisHistorico(mes,fk_empresa) {
  // declara a variável de instrução sql:
  const instrucao = `select
  1 as semana,
  f.status,
  count(f.id) quantidade
  from (
    select
      f.*,
      case
        when taxa_alerta = 0 then "normal"
        when taxa_alerta = 1 then "critico"
        else "atencao"
      end \`status\`
      from (
        select
          f.*,
          ifnull(
            sum(
              if(t.quantidade_alerta, 1, 0)
            ) / count(t.id),
            0
          ) taxa_alerta
          from filial f
          left join (
            select
              t.*,
              count(a.id) quantidade_alerta
              from totem t
              left join (
                select
                  *
                  from alerta a
                  where a.data_hora > date_sub(timestamp("${mes}-01"), interval 5 minute)
                    and a.data_hora <= timestamp("${mes}-01")
              ) a
                on t.id = a.fk_totem
              where t.data_hora <= timestamp("${mes}-01")
              group by t.id
          ) t
          on f.id = t.fk_filial
          where f.data_hora <= timestamp("${mes}-01")
          and f.fk_empresa = ${fk_empresa}
          group by f.id
      ) f
  ) f
  group by f.status
union
select
  2 as semana,
  f.status,
  count(f.id) quantidade
  from (
    select
      f.*,
      case
        when taxa_alerta = 0 then "normal"
        when taxa_alerta = 1 then "critico"
        else "atencao"
      end \`status\`
      from (
        select
          f.*,
          ifnull(
            sum(
              if(t.quantidade_alerta, 1, 0)
            ) / count(t.id),
            0
          ) taxa_alerta
          from filial f
          left join (
            select
              t.*,
              count(a.id) quantidade_alerta
              from totem t
              left join (
                select
                  *
                  from alerta a
                  where a.data_hora > date_sub(timestamp("${mes}-07"), interval 5 minute)
                    and a.data_hora <= timestamp("${mes}-07")
              ) a
                on t.id = a.fk_totem

              where t.data_hora <= timestamp("${mes}-07")
              group by t.id
          ) t
          on f.id = t.fk_filial
          where f.data_hora <= timestamp("${mes}-07")
          and f.fk_empresa = ${fk_empresa}
          group by f.id
      ) f
  ) f
  group by f.status
union
select
  3 as semana,
  f.status,
  count(f.id) quantidade
  from (
    select
      f.*,
      case
        when taxa_alerta = 0 then "normal"
        when taxa_alerta = 1 then "critico"
        else "atencao"
      end \`status\`
      from (
        select
          f.*,
          ifnull(
            sum(
              if(t.quantidade_alerta, 1, 0)
            ) / count(t.id),
            0
          ) taxa_alerta
          from filial f
          left join (
            select
              t.*,
              count(a.id) quantidade_alerta
              from totem t
              left join (
                select
                  *
                  from alerta a
                  where a.data_hora > date_sub(timestamp("${mes}-14"), interval 5 minute)
                    and a.data_hora <= timestamp("${mes}-14")
              ) a
                on t.id = a.fk_totem
              where t.data_hora <= timestamp("${mes}-14")
              group by t.id
          ) t
          on f.id = t.fk_filial
          where f.data_hora <= timestamp("${mes}-14")
          and f.fk_empresa = ${fk_empresa}
          group by f.id
      ) f
  ) f
  group by f.status
union
select
  4 as semana,
  f.status,
  count(f.id) quantidade
  from (
    select
      f.*,
      case
        when taxa_alerta = 0 then "normal"
        when taxa_alerta = 1 then "critico"
        else "atencao"
      end \`status\`
      from (
        select
          f.*,
          ifnull(
            sum(
              if(t.quantidade_alerta, 1, 0)
            ) / count(t.id),
            0
          ) taxa_alerta
          from filial f
          left join (
            select
              t.*,
              count(a.id) quantidade_alerta
              from totem t
              left join (
                select
                  *
                  from alerta a
                  where a.data_hora > date_sub(timestamp("${mes}-21"), interval 5 minute)
                    and a.data_hora <= timestamp("${mes}-21")
              ) a
                on t.id = a.fk_totem
              where t.data_hora <= timestamp("${mes}-21")
              group by t.id
          ) t
          on f.id = t.fk_filial
          where f.data_hora <= timestamp("${mes}-21")
          and f.fk_empresa = ${fk_empresa}
          group by f.id
      ) f
  ) f
  group by f.status;`;
  // declara a variável de resultado da execução:
  const resultado = database.executar(instrucao);
  console.log("Instrução:", instrucao)
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
  //    // console.log(instrucaoSql)

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
