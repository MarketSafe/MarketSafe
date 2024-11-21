-- createDatabase.sql:

-- deleta o banco de dados se já existir:
drop database if exists market_safe;
-- cria um novo banco de dados:
create database market_safe;
-- usa o banco de dados criado:
use market_safe;

-- tabelas:
/**
* tabela de endereços
*/
create table endereco (
  id int primary key auto_increment,
  cep char(9) not null,
  bairro varchar(80),
  rua varchar(80),
  numero int,
  complemento varchar(80)
);
/**
* tabela de empresas
* cada empresa possui exatamente 1 único endereço, relacionamento 1:1
*/
create table empresa(
  id int primary key auto_increment,
  data_hora timestamp default current_timestamp,
  razao_social varchar(80) not null unique,
  nome_fantasia varchar(80),
  cnpj char(18) not null unique,
  email varchar(80) not null unique,
  telefone char(19) not null unique,
  fk_endereco int not null unique,

  constraint empresa_fk_endereco foreign key (fk_endereco) references endereco(id)
);
/**
* tabela de filiais
* cada empresa possui 1 ou muitas filiais e
* cada filial precisa pertencer à 1 única empresa, relacionamento 1:n
* cada filial possui exatamente 1 único endereço, relacionamento 1:1
*/
create table filial(
  id int primary key auto_increment,
  data_hora timestamp default current_timestamp,
  nome varchar(80) not null,
  fk_empresa int not null,
  fk_endereco int not null unique,

  constraint filial_fk_empresa foreign key (fk_empresa) references empresa(id),
  constraint filial_fk_endereco foreign key (fk_endereco) references endereco(id)
);

/**
* tabela de promoções
* cada filial possui 0 ou muitas promoções e
* cada promoção precisa pertencer à 1 única filial, relacionamento 0:n
*/
create table promocao(
  id int primary key auto_increment,
  data_hora timestamp default current_timestamp,
  nome varchar(80) not null,
  fk_filial int not null,

  constraint promocao_fk_filial foreign key (fk_filial) references filial(id)
);

/* cada filial possui 0 ou 1 única promoção ativa, relacionamento 0:1
*/
alter table filial add column fk_promocao_ativa int;
alter table filial add constraint filial_fk_promocao_ativa foreign key (fk_promocao_ativa) references promocao(id);

/* tabela de funcionário
* cada empresa possui muitos funcionários e
* cada funcionário precisa estar empregado em 1 única empresa, relacionamento 1:n
* cada filial possui muitos funcionários e
* cada funcionário pode estar empregado em 0 ou 1 única filial, relacionamento 0:n
*/
create table funcionario(
  id int primary key auto_increment,
  data_hora timestamp default current_timestamp,
  nome varchar(80) not null,
  cpf char(14) not null unique,
  cargo enum('analista', 'gerente') not null,
  email varchar(80) not null unique,
  senha varchar(80) not null,
  telefone char(19) not null unique,
  fk_empresa int not null,
  fk_filial int,

  constraint funcionario_fk_empresa foreign key (fk_empresa) references empresa(id),
  constraint funcionario_fk_filial foreign key (fk_filial) references filial(id)
);
/* tabela de totens
* cada filial possui muitos totens e
* cada totem precisa pertencer à 1 única filial, relacionamento 1:n
*/
create table totem(
  id int primary key auto_increment,
  data_hora timestamp default current_timestamp,
  mac_address char(17) not null,
  fk_filial int not null,

  constraint totem_fk_filial foreign key (fk_filial) references filial(id)
);
/* tabela de alertas
* cada totem possui muitos alertas e
* cada alerta precisa pertencer a 1 único totem, relacionamento 1:n
* cada promoção pode possuir muitos alertas e
* cada alerta precisa pertencer a 0 ou 1 única promoção, relacionamento 0:1
*/
create table alerta(
  id int primary key auto_increment,
  data_hora timestamp default current_timestamp,
  cpu_porcentagem decimal(6, 2),
  ram_porcentagem decimal(6, 2),
  fk_totem int not null,
  fk_promocao int,
  
  constraint alerta_fk_totem foreign key (fk_totem) references totem(id),
  constraint alerta_fk_promocao foreign key (fk_promocao) references promocao(id)
);
