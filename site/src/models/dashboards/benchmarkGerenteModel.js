// filialModel.js:

// dependências:
//   importa o arquivo `config.js`:
const database = require("../../database/config.js");

// declara a função `estadoFiliais`:
function estadoFiliais(fk_empresa) {
  // declara a variável de instrução sql:
  const instrucao = `select f.status, count(f.id) quantidade from filial_status f where fk_empresa = ${fk_empresa} group by f.status;`;
  // declara a variável de resultado da execução:
  const resultado = database.executar(instrucao);
  // retorna o resultado da execução:
  return resultado;
}

// declara a função `maioresTaxasDeAlerta`:
function maioresTaxasDeAlerta(fk_empresa) {
  // declara a variável de instrução sql:
  const instrucao = `select f.nome, ifnull( sum( if(t.quantidade_alerta, 1, 0) ) / count(t.id), 0 ) taxa_alerta from filial f left join ( select t.*, count(a.id) quantidade_alerta from totem t left join ( select * from alerta a where a.data_hora > date_sub(current_timestamp, interval 5 minute) and a.data_hora <= current_timestamp ) a on t.id = a.fk_totem where t.data_hora <= current_timestamp group by t.id ) t on f.id = t.fk_filial where f.data_hora <= current_timestamp and f.fk_empresa = ${fk_empresa} group by f.id order by taxa_alerta desc limit 5;`;
  // declara a variável de resultado da execução:
  const resultado = database.executar(instrucao);
  // retorna o resultado da execução:
  return resultado;
}

function taxaGeralDeAlertas(fk_empresa) {
  // declara a variável de instrução sql:
  const instrucao = `select ifnull( sum( if(t.quantidade_alerta, 1, 0) ) / count(t.id), 0 ) taxa_geral from filial f left join ( select t.*, count(a.id) quantidade_alerta from totem t left join ( select * from alerta a where a.data_hora > date_sub(current_timestamp, interval 5 minute) and a.data_hora <= current_timestamp ) a on t.id = a.fk_totem where t.data_hora <= current_timestamp group by t.id ) t on f.id = t.fk_filial where f.data_hora <= current_timestamp and f.fk_empresa = ${fk_empresa};`;
  // declara a variável de resultado da execução:
  const resultado = database.executar(instrucao);
  // retorna o resultado da execução:
  return resultado;
}
function totensPorEmpresa(fk_empresa) {
  // declara a variável de instrução sql:
  const instrucao = `select count(t.id) quantidade from filial f left join totem t on f.id = t.fk_filial where f.fk_empresa = ${fk_empresa};`;
  // declara a variável de resultado da execução:
  const resultado = database.executar(instrucao);
  // retorna o resultado da execução:
  return resultado;
}
function maiorTaxaDeAlertas(fk_empresa) {
  // declara a variável de instrução sql:
  const instrucao = `select f.nome, ifnull( sum( if(t.quantidade_alerta, 1, 0) ) / count(t.id), 0 ) taxa_alerta from filial f left join ( select t.*, count(a.id) quantidade_alerta from totem t left join ( select * from alerta a where a.data_hora > date_sub(current_timestamp, interval 5 minute) and a.data_hora <= current_timestamp ) a on t.id = a.fk_totem where t.data_hora <= current_timestamp group by t.id ) t on f.id = t.fk_filial where f.data_hora <= current_timestamp and f.fk_empresa = ${fk_empresa} group by f.id order by taxa_alerta desc limit 1;`;
  // declara a variável de resultado da execução:
  const resultado = database.executar(instrucao);
  // retorna o resultado da execução:
  return resultado;
}
function totalDeFiliais(fk_empresa) {
  // declara a variável de instrução sql:
  const instrucao = `select count(f.id) quantidade from filial f where f.fk_empresa = ${fk_empresa};`;
  // declara a variável de resultado da execução:
  const resultado = database.executar(instrucao);
  // retorna o resultado da execução:
  return resultado;
}
function promocoesPorFilial(fk_filial) {
  // declara a variável de instrução sql:
  const instrucao = `select * from promocao p where p.fk_filial = ${fk_filial};`;
  // declara a variável de resultado da execução:
  const resultado = database.executar(instrucao);
  // retorna o resultado da execução:
  return resultado;
}

async function taxasDaSemanaPorFilial(fk_filial, data_hora, menos = 0) {
  // declara a variável de instrução sql:
  const instrucao = `select
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
		  where a.data_hora > date_sub(date_sub("${data_hora}", interval weekday("${data_hora}") + 1 day), interval ${menos + 1} day)
			and a.data_hora <= date_sub(date_sub("${data_hora}", interval weekday("${data_hora}") + 1 day), interval ${menos} day)
	  ) a
		on t.id = a.fk_totem
	  where t.data_hora <= date_sub(date_sub("${data_hora}", interval weekday("${data_hora}") + 1 day), interval ${menos} day)
	  group by t.id
  ) t
	on f.id = t.fk_filial
  where f.data_hora <= date_sub(date_sub("${data_hora}", interval weekday("${data_hora}") + 1 day), interval ${menos} day)
  and f.id = ${fk_filial}
  group by f.id
  order by taxa_alerta desc limit 5;`;
  console.log(instrucao);
  // declara a variável de resultado da execução:
  const resultado = await database.executar(instrucao);
  // retorna o resultado da execução:
  return resultado;
}

async function totensPorFilial(fk_filial) {
  // declara a variável de instrução sql:
  const instrucao = `select
  f.*,
  count(t.id) quantidade_totens
  from filial f
  left join totem t
	on f.id = t.fk_filial
  where f.id = ${fk_filial}
  group by f.id;`;
  // console.log(instrucao);
  // declara a variável de resultado da execução:
  const resultado = await database.executar(instrucao);
  // retorna o resultado da execução:
  return resultado;
}

async function totensEmAlertaPorFilial(fk_filial, data_hora) {
  // declara a variável de instrução sql:
  const instrucao = `select
  f.*,
  count(t.id) totens_alerta
  from filial f
  left join (
	select
	  t.*,
	  count(a.id) quantidade_alerta
	  from totem t
	  join (
		select
		  *
		  from alerta a
		  where a.data_hora > date_sub("${data_hora}", interval 1 day)
			and a.data_hora <= "${data_hora}"
	  ) a
		on t.id = a.fk_totem
	  group by t.id
  ) t
	on f.id = t.fk_filial
  where f.id = ${fk_filial}
  group by f.id;`;
  // console.log(instrucao);
  // declara a variável de resultado da execução:
  const resultado = await database.executar(instrucao);
  // retorna o resultado da execução:
  return resultado;
}

// exporta as funções do arquivo `filialModel.js`:
module.exports = {
  estadoFiliais,
  maioresTaxasDeAlerta,
  taxaGeralDeAlertas,
  totensPorEmpresa,
  maiorTaxaDeAlertas,
  totalDeFiliais,
  promocoesPorFilial,
  taxasDaSemanaPorFilial,
  totensPorFilial,
  totensEmAlertaPorFilial,
};
