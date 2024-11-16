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
  id int primary key auto_increment,
  data_hora timestamp default current_timestamp,
  razao_social varchar(80) not null unique,
  nome_fantasia varchar(80),
  cnpj char(18) not null unique,
  email varchar(80) not null unique,
  telefone char(19) not null unique,
  fk_endereco int unique,

  constraint empresa_fk_endereco foreign key (fk_endereco) references endereco(id)
);
-- tabela de filiais (cada empresa possui diversas filiais e cada filial possui 1 único endereçp, cardinalidade 1:n e cardinalidade 1:1):
create table filial(
  id int primary key auto_increment,
  data_hora timestamp default current_timestamp,
  fk_empresa int,
  fk_endereco int unique,

  constraint filial_fk_empresa foreign key (fk_empresa) references empresa(id),
  constraint filial_fk_endereco foreign key (fk_endereco) references endereco(id)
);

alter table filial add column promocao_ativa int;

create table promocao(
id int primary key auto_increment,
data_hora timestamp default current_timestamp,
nome varchar(80) not null, 
fk_filial int,
constraint promocao_fk_filial foreign key (fk_filial) references filial(id)
);

alter table filial add constraint filial_fk_promocao foreign key (promocao_ativa) references promocao(id);

-- tabela de funcionário (cada funcionário pode estar empregado em uma única empresa e em 0 ou 1 única filial, cardinalidade n:1, 0:1):
create table funcionario(
  id int primary key auto_increment,
  data_hora timestamp default current_timestamp,
  nome varchar(80) not null,
  cpf char(14) not null unique,
  cargo enum('analista', 'gerente') not null,
  email varchar(80) not null unique,
  senha varchar(80) not null,
  telefone char(19) not null unique,
  fk_empresa int,
  fk_filial int,

  constraint funcionario_fk_empresa foreign key (fk_empresa) references empresa(id),
  constraint funcionario_fk_filial foreign key (fk_filial) references filial(id)
);
-- tabela de totens (cada totem pertence a uma única filial, cardinalidade n:1):
create table totem(
  id int primary key auto_increment,
  data_hora timestamp default current_timestamp,
  mac_address char(17) not null,
  fk_filial int,

  constraint totem_fk_filial foreign key (fk_filial) references filial(id)
);
-- tabela de alertas (cada totem pode possuir vários alertas, cardinalidade 1:n):
create table alerta(
  id int primary key auto_increment,
  data_hora timestamp default current_timestamp,
  cpu_porcentagem decimal(6, 2),
  ram_porcentagem decimal(6, 2),
  fk_totem int,
  fk_promocao int,
  
  constraint alerta_fk_totem foreign key (fk_totem) references totem(id),
  constraint alerta_fk_promocao foreign key (fk_promocao) references promocao(id)
);