-- initDatabase.sql:

-- createDatabase.sql:

-- deleta o banco de dados se já existir:
drop database if exists market_safe;
-- cria um novo banco de dados:
create database market_safe;
-- usa o banco de dados criado:
use market_safe;

-- tabela de endereços (rua, bairro, cep):
create table endereco (
  id int primary key auto_increment,
  cep char(9) not null,
  bairro varchar(80),
  rua varchar(80),
  numero int,
  complemento varchar(80)
);
-- tabela de empresas (cada empresa possui um único endereço, cardinalidade 1:1):
create table empresa(
  id int auto_increment,
  razao_social varchar(80) not null unique,
  nome_fantasia varchar(80),
  cnpj char(18) not null unique,
  email varchar(80) not null unique,
  telefone char(19) not null unique,
  fk_endereco int unique,

  constraint pk_empresa primary key (id, fk_endereco),
  constraint empresa_fk_endereco foreign key (fk_endereco) references endereco(id)
);
-- tabela de funcionário (cada funcionário pode estar empregado em uma única empresa, cardinalidade n:1):
create table funcionario(  
  id int auto_increment,
  nome varchar(80) not null,
  cpf char(14) not null unique,
  cargo char(15) not null,
  email varchar(80) not null unique,
  senha varchar(80) not null,
  telefone char(19) not null unique,
  fk_empresa int,

  constraint pk_funcionario primary key (id, fk_empresa),
  constraint funcionario_fk_empresa foreign key (fk_empresa) references empresa(id)
);
-- tabela de máquinas (cada máquina pertence a uma única empresa, cardinalidade n:1):
create table maquina(
  id int auto_increment,
  hostname varchar(80) not null,
  fk_empresa int,

  constraint pk_maquina primary key (id, fk_empresa),
  constraint maquina_fk_empresa foreign key (fk_empresa) references empresa(id)
);
-- tabela de dadods da máquina (cada máquina pode possuir vários dados, cardinalidade n:1):
create table dados_maquina(
  id int auto_increment,
  data_hora_registro timestamp default current_timestamp,
  cpu decimal(6, 2),
  ram decimal(6, 2),
  fk_empresa int,
  fk_maquina int,

  constraint pk_dados_maquina primary key (id, fk_maquina, fk_empresa),
  constraint dados_maquina_fk_empresa foreign key (fk_empresa) references empresa(id),
  constraint dados_maquina_fk_maquina foreign key (fk_maquina) references maquina(id)
);

-- createUser.sql:

drop user if exists 'mktsAdm'@'%';
create user 'mktsAdm'@'%' identified by 'sptech';
grant all privileges on market_safe.* to 'mktsAdm'@'%';

drop user if exists 'mktsUser'@'%';
create user 'mktsUser'@'%' identified by 'sptech';
grant insert, select on market_safe.* to 'mktsUser'@'%';

drop user if exists 'mktsUserInsert'@'%';
create user 'mktsUserInsert'@'%' identified by 'sptech';
grant insert on market_safe.* to 'mktsUserInsert'@'%';

drop user if exists 'mktsUserSelect'@'%';
create user 'mktsUserSelect'@'%' identified by 'sptech';
grant select on market_safe.* to 'mktsUserSelect'@'%';
