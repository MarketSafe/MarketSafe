-- createDatabase.sql 

drop database if exists market_safe;
create database market_safe;
use market_safe;

create table endereco (
  id int primary key auto_increment,
  cep char(9) not null,
  bairro varchar(80),
  rua varchar(80),
  numero int,
  logradouro varchar(80),
  complemento varchar(80)
);

create table empresa(
  id int auto_increment,
  razao_social varchar(80) not null unique,
  nome_fantasia varchar(80),
  cnpj char(18) not null unique,
  email varchar(80) not null unique,
  telefone char(19) not null unique,
  fk_endereco int,
  constraint pk_empresa primary key (id, fk_endereco),
  constraint empresa_fk_endereco foreign key (fk_endereco) references endereco(id)
);

create table funcionario(  
  id int auto_increment,
  nome varchar(80) not null,
  cpf char(14) not null unique,
  cargo char(15) not null,
  email varchar(80) not null unique,
  senha varchar(80) not null,
  telefone char(19) not null unique,
  fk_empresa int,
  constraint pk_empresa primary key (id, fk_empresa),
  constraint funcionario_fk_empresa foreign key (fk_empresa) references empresa(id)
);

create table maquina(
  id int auto_increment,
  hostname varchar(80) not null unique,
  marca varchar(80),
  fk_empresa int,
  constraint pk_empresa primary key (id, fk_empresa),
  constraint maquina_fk_empresa foreign key (fk_empresa) references empresa(id)
);

create table dados_maquina(
  id int auto_increment,
  data timestamp default current_timestamp,
  cpu float,
  memoria float,
  fk_maquina int,
  constraint pk_empresa primary key (id, fk_maquina),
  constraint maquina_fk_maquina foreign key (fk_maquina) references empresa(id)
);

-- drop user 'mktsAdm'@'%';
create user if not exists 'mktsAdm'@'%' identified by 'sptech';
grant all privileges on market_safe.* to 'mktsAdm'@'%';

-- drop user 'mktsUser'@'%';
create user if not exists 'mktsUser'@'%' identified by 'sptech';
grant insert, select on market_safe.* to 'mktsUser'@'%';

-- drop user 'mktsUserInsert'@'%';
create user if not exists 'mktsUserInsert'@'%' identified by 'sptech';
grant insert on market_safe.* to 'mktsUserInsert'@'%';

-- drop user 'mktsUserSelect'@'%';
create user if not exists 'mktsUserSelect'@'%' identified by 'sptech';
grant select on market_safe.* to 'mktsUserSelect'@'%';
