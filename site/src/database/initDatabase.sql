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

drop user if exists 'mktsUserInsertAlerta'@'%';
create user 'mktsUserInsertAlerta'@'%' identified by 'sptech';
grant insert on market_safe.alerta to 'mktsUserInsertAlerta'@'%';

-- insert.sql:

insert into endereco (cep, bairro, rua, numero, complemento) values
  ("123-45678", "bairro", "rua", 0, "complemento"),
  ("234-56789", "bairro 2", "avenida", 10, "prédio 1"),
  ("345-67890", "bairro 3", "travessa", 20, NULL),
  ("456-78901", "bairro 4", "estrada", 30, "casa 2"),
  ("567-89012", "bairro 5", "rodovia", 40, "bloco 3");

insert into empresa (razao_social, nome_fantasia, cnpj, email, telefone, fk_endereco) values
  ("Empresa Alfa Ltda", "Alfa Tech", "12.345.678/9012-34", "contato@alfa.com", "+12 (34) 56789-1234", 1),
  ("Empresa Beta Ltda", "Beta Soluções", "98.765.432/1098-76", "contato@beta.com", "+12 (34) 56789-5678", 2);

insert into funcionario (nome, cpf, cargo, email, senha, telefone, fk_empresa) values
  ("Gisele", "123.456.789-01", "gerente", "gisele@gmail.com", "123456789", "+12 (34) 56789-0123", 1),
  ("Nagasse", "123.456.789-02", "analista", "nagasse@gmail.com", "123456789", "+12 (34) 56789-0456", 1);

insert into filial (fk_empresa, fk_endereco) values
  (1, 3),
  (1, 4),
  (2, 5);

insert into totem (mac_address, fk_filial) values
  ("873c66420d5f", 1),
  ("abc123456789", 2),
  ("def987654321", 3);

insert into alerta values
(default, "2024-11-09 12:12:12", 89.0, 15.9, 1, null),
(default, "2024-11-10 12:12:12", 89.0, 15.9, 1, null),
(default, "2024-11-11 12:12:12", 89.0, 15.9, 1, null),
(default, "2024-11-12 12:12:12", 89.0, 15.9, 1, null),
(default, "2024-11-13 12:12:12", 89.0, 15.9, 1, null);

-- select.sql:

select * from endereco;

select * from empresa;

select * from filial;

select * from promocao;

select * from funcionario;

select * from totem;

select * from alerta;