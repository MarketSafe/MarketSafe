-- select.sql:

-- selects gerais:
select * from endereco;

select * from empresa;

select * from filial;

select * from promocao;

select * from funcionario;

select * from totem;

select * from alerta;


select
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
end `status`
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
where a.data_hora > timestamp("${mes}-01")
and a.data_hora < timestamp("${mes}-07")
) a
on t.id = a.fk_totem
where t.data_hora < timestamp("${mes}-07")
group by t.id
) t
on f.id = t.fk_filial
where f.data_hora < timestamp("${mes}-07")
group by f.id
) f
) f
where f.fk_empresa = 1
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
end `status`
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
and a.data_hora < timestamp("${mes}-07")
) a
on t.id = a.fk_totem
where t.data_hora < timestamp("${mes}-07")
group by t.id
) t
on f.id = t.fk_filial
where f.data_hora < timestamp("${mes}-07")
group by f.id
) f
) f
where f.fk_empresa = 1
group by f.status;
