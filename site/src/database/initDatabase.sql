-- initDatabase.sql:

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

insert into filial (nome, fk_empresa, fk_endereco) values
  ("Filial 1", 1, 3),
  ("Filial 2", 1, 4),
  ("Filial 3", 1, 5),
  ("Filial 4", 1, 2),
  ("Filial 5", 1, 1);

insert into totem (mac_address, fk_filial) values
  ("873c66420d5f", 1),
  ("abc123456789", 2),
  ("def987654321", 3);

insert into promocao (nome, fk_filial) values
  ('Carnes', 1),
  ('Frutas', 1),
  ('Bebidas', 1),
  ('Laticínios', 1),
  ('Padaria', 1),
  ('Enlatados', 1),
  ('Higiene', 2),
  ('Limpeza', 3),
  ('Cereais', 4),
  ('Doces', 5),
  ('Massas', 1),
  ('Temperos', 2),
  ('Congelados', 3),
  ('Produtos Naturais', 4),
  ('Mercearia', 5),
  ('Bebidas Alcoólicas', 1),
  ('Refrigerantes', 2),
  ('Sucos', 3),
  ('Produtos para Pets', 4),
  ('Frios', 5),
  ('Hortifruti', 1),
  ('Produtos Orgânicos', 2);

insert into alerta (cpu_porcentagem, ram_porcentagem, fk_totem, fk_promocao) values
  (85.50, 70.30, 1, 1),
  (90.20, 80.10, 2, 2),
  (88.00, 85.00, 3, 3),
  (95.60, 78.90, 1, 2),
  (87.40, 82.50, 2, 2),
  (92.30, 77.80, 3, 1),
  (84.00, 75.20, 1, 2),
  (89.50, 81.00, 2, 3),
  (91.70, 79.60, 3, 1),
  (86.40, 73.90, 1, 1),
  (83.20, 74.50, 1, 1),
  (87.90, 76.30, 1, 2),
  (90.50, 80.00, 2, 3),
  (88.80, 82.40, 3, 1),
  (85.00, 78.20, 2, 1),
  (92.70, 81.90, 2, 1),
  (94.50, 83.60, 1, 1),
  (89.00, 77.00, 3, 1),
  (86.80, 79.50, 3, 2),
  (91.20, 80.80, 2, 2),
  (88.40, 76.70, 2, 3),
  (84.60, 74.00, 2, 3),
  (85.50, 75.00, 1, 4),
  (90.10, 80.00, 2, 5),
  (92.20, 77.50, 3, 6),
  (89.00, 78.80, 1, 7),
  (88.40, 77.20, 2, 8); 

-- select.sql:

select * from endereco;

select * from empresa;

select * from filial;

select * from promocao;

select * from funcionario;

select * from totem;

select * from alerta;
