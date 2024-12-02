-- createView.sql:

-- retorna a quantidade de alertas ativos no momento:
create or replace view alerta_ativo as
  select
    *
    from alerta
    where data_hora > date_sub(current_timestamp, interval 5 minute)
      and data_hora <= current_timestamp;

select * from alerta_ativo;

-- retorna os alertas ativos dos totens:
create or replace view totem_alerta_ativo as 
  select
    t.*,
    count(a.id) quantidade_alerta
    from totem t
    left join alerta_ativo a
      on t.id = a.fk_totem
    where t.data_hora <= current_timestamp
    group by t.id;

select * from totem_alerta_ativo;

-- retorna a taxa de alertas das filiais:
create or replace view filial_taxa_alerta as
  select
    f.*,
    ifnull(
      sum(
        if(t.quantidade_alerta, 1, 0)
      ) / count(t.id),
      0
    ) taxa_alerta
    from filial f
    left join totem_alerta_ativo t
      on f.id = t.fk_filial
    where f.data_hora <= current_timestamp
    group by f.id;

select * from filial_taxa_alerta;

-- retorna o status das filiais baseado na taxa de alertas:
create or replace view filial_status as
  select
    f.*,
    case
      when taxa_alerta = 0 then "normal"
      when taxa_alerta = 1 then "critico"
      else "atencao"
    end `status`
    from filial_taxa_alerta f;

select * from filial_status;

-- retorna a quantidade de filiais em determinado status:
select
  f.status,
  count(f.id) quantidade
  from filial_status f
  where fk_empresa = 1
  group by f.status;
