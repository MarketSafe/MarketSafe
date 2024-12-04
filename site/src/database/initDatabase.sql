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


insert into empresa (data_hora, razao_social, nome_fantasia, cnpj, email, telefone, fk_endereco) values
  ("2024-10-01 00:00:00", "Empresa Alfa Ltda", "Alfa Tech", "12.345.678/9012-34", "contato@alfa.com", "+12 (34) 56789-1234", 1),
  ("2024-10-01 00:00:00", "Empresa Beta Ltda", "Beta Soluções", "98.765.432/1098-76", "contato@beta.com", "+12 (34) 56789-5678", 2);


insert into funcionario (data_hora, nome, cpf, cargo, email, senha, telefone, fk_empresa) values
  ("2024-10-02 00:00:00","Gisele", "123.456.789-01", "gerente", "gisele@gmail.com", "123456789", "+12 (34) 56789-0123", 1),
  ("2024-10-02 00:00:00","Nagasse", "123.456.789-02", "analista", "nagasse@gmail.com", "123456789", "+12 (34) 56789-0456", 1),
  ("2024-10-02 00:00:00","Vitor", "153.456.789-01", "gerente", "vitor@gmail.com", "123456789", "+12 (34) 55789-0123", 1);
  

INSERT INTO filial (data_hora, nome, fk_empresa, fk_endereco) VALUES
("2024-10-03 00:00:00", "Filial 1", 1, 3),
("2024-10-03 00:00:00", "Filial 2",1, 4),
("2024-10-03 00:00:00", "Filial 3",1, 5),
("2024-10-03 00:00:00", "Filial 4",1, 2),
("2024-10-03 00:00:00", "Filial 5",1, 1);


insert into totem (data_hora, mac_address, fk_filial) values
  ("2024-10-04 00:00:00","12680cf3b36b", 1),
  ("2024-10-04 00:00:00","abc123456789", 2),
  ("2024-10-04 00:00:00","def987654321", 3),
  ("2024-10-04 00:00:00","58ce2a600896", 4),
  ("2024-10-04 00:00:00","a1b2c3d4e5f6", 3),
  ("2024-10-04 00:00:00","f0e1d2c3b4a5", 4);

  


insert into alerta values
(default, "2024-11-09 12:12:12", 89.0, 15.9, 1, null),
(default, "2024-11-10 12:12:12", 89.0, 15.9, 1, null),
(default, "2024-11-11 12:12:12", 89.0, 15.9, 1, null),
(default, "2024-11-12 12:12:12", 89.0, 15.9, 1, null),
(default, "2024-11-13 12:12:12", 89.0, 15.9, 1, null);


-- Inserindo promoções genéricas
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

-- SAMPAIO
INSERT INTO alerta (data_hora, cpu_porcentagem, ram_porcentagem, fk_totem) VALUES
("2024-11-18 10:30:00", 20.00, 87.00, 1),
("2024-11-18 14:15:00", 60.00, 90.00, 1),
("2024-11-19 09:50:00", 52.00, 88.00, 1),
("2024-11-19 12:00:00", 40.00, 95.00, 1),
("2024-11-19 15:10:00", 55.00, 95.00, 1),
("2024-11-19 12:30:00", 80.00, 86.00, 1),
("2024-11-19 19:00:00", 65.00, 92.00, 1),
("2024-11-20 10:10:00", 75.00, 88.00, 1),
("2024-11-20 15:30:00", 60.00, 87.00, 1),
("2024-11-20 18:45:00", 80.00, 89.00, 1),
("2024-11-22 15:30:00", 82.00, 89.00, 1),
("2024-11-22 14:10:00", 65.00, 93.00, 1),
("2024-11-22 16:00:00", 78.00, 87.00, 1),
("2024-11-22 17:00:00", 78.00, 87.00, 1),
("2024-11-23 12:15:00", 70.00, 90.00, 1),
("2024-11-23 14:45:00", 60.00, 88.00, 1),
("2024-11-18 10:30:00", 90.00, 17.00, 1),
("2024-11-18 14:15:00", 90.00, 20.00, 1),
("2024-11-19 09:50:00", 92.00, 28.00, 1),
("2024-11-19 12:00:00", 90.00, 25.00, 1),
("2024-11-19 15:10:00", 95.00, 55.00, 1),
("2024-11-19 17:30:00", 90.00, 16.00, 1),
("2024-11-19 19:00:00", 95.00, 32.00, 1),
("2024-11-20 10:10:00", 95.00, 48.00, 1),
("2024-11-20 15:30:00", 90.00, 67.00, 1),
("2024-11-20 18:45:00", 90.00, 29.00, 1),
("2024-11-22 09:30:00", 92.00, 39.00, 1),
("2024-11-22 13:10:00", 95.00, 43.00, 1),
("2024-11-22 16:00:00", 88.00, 67.00, 1),
("2024-11-23 12:15:00", 90.00, 40.00, 1),
("2024-11-23 14:45:00", 90.00, 28.00, 1),
("2024-11-18 10:30:00", 90.00, 37.00, 1),
("2024-11-18 14:15:00", 90.00, 50.00, 1),
("2024-11-19 09:50:00", 92.00, 28.00, 1),
("2024-11-19 12:00:00", 90.00, 15.00, 1),
("2024-11-19 15:10:00", 95.00, 35.00, 1),
("2024-11-19 17:30:00", 90.00, 36.00, 1),
("2024-11-19 19:00:00", 95.00, 42.00, 1),
("2024-11-20 10:10:00", 95.00, 28.00, 1),
("2024-11-20 15:30:00", 90.00, 37.00, 1),
("2024-11-20 18:45:00", 90.00, 39.00, 1),
("2024-11-22 09:30:00", 92.00, 59.00, 1),
("2024-11-22 13:10:00", 95.00, 63.00, 1),
("2024-11-22 16:00:00", 88.00, 47.00, 1),
("2024-11-23 12:15:00", 90.00, 60.00, 1),
("2024-11-23 14:45:00", 90.00, 48.00, 1),
("2024-11-17 10:20:00", 75.00, 90.00, 2),
("2024-11-17 11:40:00", 82.00, 88.00, 2),
("2024-11-17 12:30:00", 65.00, 87.00, 2),
("2024-11-17 13:15:00", 60.00, 95.00, 2),
("2024-11-17 14:00:00", 70.00, 89.00, 2),
("2024-11-17 15:10:00", 80.00, 91.00, 2),
("2024-11-17 16:20:00", 75.00, 86.00, 2),
("2024-11-17 17:30:00", 65.00, 92.00, 2),
("2024-11-17 18:45:00", 60.00, 93.00, 2),
("2024-11-17 19:50:00", 81.00, 94.00, 2),
("2024-11-19 10:10:00", 65.00, 90.00, 2),
("2024-11-19 15:20:00", 72.00, 92.00, 2),
("2024-11-19 18:00:00", 80.00, 95.00, 2),
("2024-11-19 19:30:00", 55.00, 85.00, 2),
("2024-11-21 10:10:00", 65.00, 90.00, 2),
("2024-11-21 15:20:00", 72.00, 92.00, 2),
("2024-11-21 18:00:00", 80.00, 95.00, 2),
("2024-11-21 19:30:00", 55.00, 85.00, 2),
("2024-11-21 18:00:00", 80.00, 95.00, 2),
("2024-11-21 19:30:00", 55.00, 85.00, 2),
("2024-11-22 10:10:00", 65.00, 90.00, 2),
("2024-11-22 15:20:00", 72.00, 92.00, 2),
("2024-11-22 18:00:00", 80.00, 95.00, 2),
("2024-11-22 19:30:00", 55.00, 85.00, 2),
("2024-11-22 18:00:00", 80.00, 95.00, 2),
("2024-11-22 19:30:00", 55.00, 85.00, 2),
("2024-11-23 10:10:00", 65.00, 90.00, 2),
("2024-11-23 15:20:00", 72.00, 92.00, 2),
("2024-11-23 18:00:00", 80.00, 95.00, 2),
("2024-11-23 19:30:00", 55.00, 85.00, 2),
("2024-11-17 10:10:00", 70.00, 90.00, 3),
("2024-11-17 10:20:00", 70.00, 90.00, 3),
("2024-11-17 10:30:00", 70.00, 90.00, 3),
("2024-11-17 10:40:00", 70.00, 90.00, 3),
("2024-11-17 10:50:00", 70.00, 90.00, 3),
("2024-11-17 11:00:00", 70.00, 90.00, 3),
("2024-11-17 11:10:00", 70.00, 90.00, 3),
("2024-11-17 11:20:00", 70.00, 90.00, 3),
("2024-11-17 11:30:00", 70.00, 90.00, 3),
("2024-11-17 11:40:00", 70.00, 90.00, 3),
("2024-11-17 11:50:00", 70.00, 90.00, 3),
("2024-11-17 12:00:00", 70.00, 90.00, 3),
("2024-11-17 12:00:00", 70.00, 90.00, 3),
("2024-11-17 12:10:00", 70.00, 90.00, 3),
("2024-11-17 12:20:00", 70.00, 90.00, 3),
("2024-11-17 12:30:00", 70.00, 90.00, 3),
("2024-11-17 12:40:00", 70.00, 90.00, 3),
("2024-11-17 12:50:00", 70.00, 90.00, 3),
("2024-11-17 13:00:00", 70.00, 90.00, 3),
("2024-11-17 14:10:00", 70.00, 90.00, 3),
("2024-11-17 12:00:00", 65.00, 88.00, 4),
("2024-11-17 12:00:00", 65.00, 88.00, 4),
("2024-11-17 12:00:00", 65.00, 88.00, 4),
("2024-11-17 12:00:00", 65.00, 88.00, 4),
("2024-11-17 12:00:00", 65.00, 88.00, 4),
("2024-11-17 12:00:00", 65.00, 88.00, 4),
("2024-11-17 12:00:00", 65.00, 88.00, 4),
("2024-11-17 12:00:00", 65.00, 88.00, 4),
("2024-11-17 12:00:00", 65.00, 88.00, 4),
("2024-11-17 12:00:00", 65.00, 88.00, 4),
("2024-11-17 12:00:00", 65.00, 88.00, 4),
("2024-11-17 12:00:00", 65.00, 88.00, 4),
("2024-11-17 12:00:00", 65.00, 88.00, 4),
("2024-11-17 12:00:00", 65.00, 88.00, 4),
("2024-11-17 12:00:00", 65.00, 88.00, 4),
("2024-11-18 09:00:00", 75.00, 87.00, 5),
("2024-11-18 09:00:00", 75.00, 91.00, 5),
("2024-11-18 09:00:00", 75.00, 91.00, 5),
("2024-11-18 09:00:00", 75.00, 91.00, 5),
("2024-11-18 09:00:00", 75.00, 91.00, 5),
("2024-11-18 09:00:00", 75.00, 91.00, 5),
("2024-11-18 09:00:00", 75.00, 91.00, 5),
("2024-11-18 09:00:00", 75.00, 91.00, 5),
("2024-11-18 09:00:00", 75.00, 91.00, 5),
("2024-11-18 09:00:00", 75.00, 91.00, 5),
("2024-11-18 09:00:00", 75.00, 91.00, 5),
("2024-11-18 09:00:00", 75.00, 91.00, 5),
("2024-11-18 09:00:00", 75.00, 91.00, 5),
("2024-11-18 09:00:00", 75.00, 91.00, 5),
("2024-11-18 09:00:00", 75.00, 91.00, 5),
("2024-11-19 11:00:00", 80.00, 88.00, 6),
("2024-11-19 11:00:00", 80.00, 88.00, 6),
("2024-11-19 11:00:00", 80.00, 88.00, 6),
("2024-11-19 11:00:00", 80.00, 88.00, 6),
("2024-11-19 11:00:00", 80.00, 88.00, 6),
("2024-11-19 11:00:00", 80.00, 88.00, 6),
("2024-11-19 11:00:00", 80.00, 88.00, 6),
("2024-11-19 11:00:00", 80.00, 88.00, 6),
("2024-11-19 11:00:00", 80.00, 88.00, 6),
("2024-11-19 11:00:00", 80.00, 88.00, 6),
("2024-11-19 11:00:00", 80.00, 88.00, 6),
("2024-11-19 11:00:00", 80.00, 88.00, 6),
("2024-11-19 11:00:00", 80.00, 88.00, 6),
("2024-11-19 11:00:00", 80.00, 88.00, 6),
("2024-11-19 11:00:00", 80.00, 88.00, 6),
("2024-11-19 11:00:00", 80.00, 88.00, 6),
("2024-11-19 11:00:00", 80.00, 88.00, 6),
("2024-11-19 11:00:00", 80.00, 88.00, 6),
("2024-11-19 11:00:00", 80.00, 88.00, 6),
("2024-11-19 11:00:00", 80.00, 88.00, 6);

INSERT INTO alerta (data_hora, cpu_porcentagem, ram_porcentagem, fk_totem, fk_promocao) VALUES

("2024-11-01 08:00:00", 85.20, 70.40, 1, 1),
("2024-11-01 10:30:00", 87.50, 75.00, 2, 2),
("2024-11-01 14:15:00", 90.10, 80.30, 3, 3),
("2024-11-02 17:45:00", 88.00, 72.50, 4, 4),
("2024-11-02 09:10:00", 85.60, 74.20, 1, 5),
("2024-11-02 11:40:00", 89.20, 78.50, 2, 1),
("2024-11-02 16:00:00", 91.80, 82.40, 3, 2),
("2024-11-02 19:30:00", 87.90, 73.50, 4, 3),
("2024-11-02 07:45:00", 86.50, 70.10, 1, 4),
("2024-11-02 12:15:00", 90.60, 75.80, 2, 5),
("2024-11-03 18:20:00", 88.70, 78.30, 3, 1),
("2024-11-03 22:00:00", 92.10, 80.90, 4, 2),
("2024-11-03 08:30:00", 85.40, 71.20, 1, 3),
("2024-11-04 10:50:00", 89.80, 76.50, 2, 4),
("2024-11-04 15:00:00", 91.20, 79.00, 3, 5),
("2024-11-04 18:30:00", 88.50, 74.10, 4, 1),
("2024-11-05 09:00:00", 86.00, 73.40, 1, 2),
("2024-11-05 13:20:00", 90.00, 78.60, 2, 3),
("2024-11-05 17:45:00", 88.30, 80.20, 3, 4),
("2024-11-05 21:30:00", 92.50, 82.90, 4, 5),
("2024-11-06 08:15:00", 85.90, 70.80, 1, 1),
("2024-11-06 11:30:00", 88.40, 75.40, 2, 2),
("2024-11-06 16:10:00", 90.70, 78.90, 3, 3),
("2024-11-06 19:50:00", 87.10, 74.60, 4, 4),
("2024-11-07 07:20:00", 85.30, 71.10, 1, 5),
("2024-11-07 12:00:00", 89.50, 76.70, 2, 1),
("2024-11-08 17:15:00", 91.40, 81.20, 3, 2),
("2024-11-08 21:40:00", 88.60, 79.10, 4, 3),
("2024-11-08 08:45:00", 86.80, 70.30, 1, 4),
("2024-11-08 14:00:00", 90.90, 76.40, 2, 5),
("2024-11-08 18:15:00", 88.20, 78.50, 3, 1),
("2024-11-08 22:30:00", 92.70, 80.70, 4, 2),
("2024-11-09 07:30:00", 85.50, 71.50, 1, 3),
("2024-11-09 11:45:00", 88.60, 74.20, 2, 4),
("2024-11-09 16:30:00", 90.80, 77.60, 3, 5),
("2024-11-09 20:10:00", 87.40, 72.80, 4, 1),
("2024-11-09 09:00:00", 86.20, 70.90, 1, 2),
("2024-11-09 13:15:00", 89.70, 75.30, 2, 3),
("2024-11-09 18:25:00", 91.50, 78.10, 3, 4),
("2024-11-10 22:50:00", 88.00, 73.50, 4, 5),
("2024-11-10 08:10:00", 85.60, 72.00, 1, 1),
("2024-11-10 12:40:00", 89.20, 76.80, 2, 2),
("2024-11-10 17:50:00", 90.30, 79.50, 3, 3),
("2024-11-11 21:20:00", 87.70, 74.10, 4, 4),
("2024-11-12 07:50:00", 86.10, 71.90, 1, 5),
("2024-11-12 11:30:00", 89.90, 77.20, 2, 1),
("2024-11-12 15:45:00", 91.80, 81.00, 3, 2),
("2024-11-12 20:15:00", 88.90, 79.40, 4, 3),
("2024-11-13 09:20:00", 86.40, 73.10, 1, 4),
("2024-11-13 13:00:00", 90.70, 76.30, 2, 5),
("2024-11-13 17:30:00", 88.10, 78.20, 3, 1),
("2024-11-13 21:40:00", 92.40, 80.80, 4, 2),
("2024-11-14 08:10:00", 85.80, 70.70, 1, 3),
("2024-11-15 12:30:00", 88.80, 75.10, 2, 4),
("2024-11-15 17:15:00", 90.90, 78.60, 3, 5),
("2024-11-15 22:20:00", 87.60, 74.30, 4, 1),
("2024-11-15 07:45:00", 85.70, 71.20, 1, 2),
("2024-11-15 13:15:00", 89.60, 76.40, 2, 3),
("2024-11-15 17:50:00", 91.70, 79.90, 3, 4),
("2024-11-15 21:10:00", 88.40, 73.90, 4, 5),
("2024-11-16 08:20:00", 86.30, 72.50, 1, 1),
("2024-11-16 12:40:00", 90.50, 77.10, 2, 2),
("2024-11-16 16:10:00", 88.60, 79.20, 3, 3),
("2024-11-16 19:40:00", 92.20, 80.50, 4, 4),
("2024-11-25 22:30:00", 92.00, 82.10, 4, 5),
("2024-11-14 08:20:00", 85.70, 70.40, 1, 1),
("2024-11-14 11:40:00", 89.60, 75.10, 2, 2),
("2024-11-14 16:15:00", 90.70, 78.70, 3, 3),
("2024-11-14 20:50:00", 87.50, 73.50, 4, 4),
("2024-11-14 07:55:00", 85.30, 72.50, 1, 5),
("2024-11-14 12:10:00", 89.80, 76.90, 2, 1),
("2024-11-14 17:00:00", 91.40, 80.00, 3, 2),
("2024-11-14 21:35:00", 88.90, 78.20, 4, 3), 	
("2024-11-14 09:00:00", 86.70, 73.10, 1, 4),
("2024-11-14 13:40:00", 90.30, 76.80, 2, 5),
("2024-11-14 17:30:00", 88.10, 79.50, 3, 1),
("2024-11-14 21:45:00", 92.60, 81.20, 4, 2),
("2024-11-29 08:30:00", 85.50, 70.80, 1, 3),
("2024-11-29 12:15:00", 89.70, 76.20, 2, 4),
("2024-11-29 17:20:00", 90.90, 79.10, 3, 5),
("2024-11-29 21:50:00", 87.90, 74.70, 4, 1),
("2024-11-30 09:30:00", 86.00, 72.00, 1, 2),
("2024-11-30 13:50:00", 90.60, 77.50, 2, 3),
("2024-11-30 18:20:00", 88.50, 80.00, 3, 4),
("2024-11-30 22:40:00", 92.70, 81.90, 4, 5);

INSERT INTO alerta (data_hora, cpu_porcentagem, ram_porcentagem, fk_totem, fk_promocao) VALUES

("2024-10-01 08:00:00", 85.20, 70.40, 1, 1),
("2024-10-01 10:30:00", 87.50, 75.00, 2, 2),
("2024-10-01 14:15:00", 90.10, 80.30, 3, 3),
("2024-10-02 17:45:00", 88.00, 72.50, 4, 4),
("2024-10-02 09:10:00", 85.60, 74.20, 1, 5),
("2024-10-02 10:40:00", 89.20, 78.50, 2, 1),
("2024-10-02 16:00:00", 91.80, 82.40, 3, 2),
("2024-10-02 19:30:00", 87.90, 73.50, 4, 3),
("2024-10-02 07:45:00", 86.50, 70.10, 1, 4),
("2024-10-02 10:15:00", 90.60, 75.80, 2, 5),
("2024-10-03 18:20:00", 88.70, 78.30, 3, 1),
("2024-10-03 22:00:00", 92.10, 80.90, 4, 2),
("2024-10-03 08:30:00", 85.40, 71.20, 1, 3),
("2024-10-04 10:50:00", 89.80, 76.50, 2, 4),
("2024-10-04 15:00:00", 91.20, 79.00, 3, 5),
("2024-10-04 18:30:00", 88.50, 74.10, 4, 1),
("2024-10-05 09:00:00", 86.00, 73.40, 1, 2),
("2024-10-05 13:20:00", 90.00, 78.60, 2, 3),
("2024-10-05 17:45:00", 88.30, 80.20, 3, 4),
("2024-10-05 21:30:00", 92.50, 82.90, 4, 5),
("2024-10-06 08:15:00", 85.90, 70.80, 1, 1),
("2024-11-06 11:30:00", 88.40, 75.40, 2, 2),
("2024-10-06 16:10:00", 90.70, 78.90, 3, 3),
("2024-10-06 19:50:00", 87.10, 74.60, 4, 4),
("2024-10-07 07:20:00", 85.30, 71.10, 1, 5),
("2024-10-07 10:00:00", 89.50, 76.70, 2, 1),
("2024-10-08 17:15:00", 91.40, 81.20, 3, 2),
("2024-10-08 21:40:00", 88.60, 79.10, 4, 3),
("2024-10-08 08:45:00", 86.80, 70.30, 1, 4),
("2024-10-08 14:00:00", 90.90, 76.40, 2, 5),
("2024-10-08 18:15:00", 88.20, 78.50, 3, 1),
("2024-10-08 22:30:00", 92.70, 80.70, 4, 2),
("2024-10-09 07:30:00", 85.50, 71.50, 1, 3),
("2024-10-09 11:45:00", 88.60, 74.20, 2, 4),
("2024-10-09 16:30:00", 90.80, 77.60, 3, 5),
("2024-10-09 20:10:00", 87.40, 72.80, 4, 1),
("2024-10-09 09:00:00", 86.20, 70.90, 1, 2),
("2024-10-09 13:15:00", 89.70, 75.30, 2, 3),
("2024-10-09 18:25:00", 91.50, 78.10, 3, 4),
("2024-10-10 22:50:00", 88.00, 73.50, 4, 5),
("2024-10-10 08:10:00", 85.60, 72.00, 1, 1),
("2024-10-10 10:40:00", 89.20, 76.80, 2, 2),
("2024-10-10 17:50:00", 90.30, 79.50, 3, 3),
("2024-10-11 21:20:00", 87.70, 74.10, 4, 4),
("2024-10-10 07:50:00", 86.10, 71.90, 1, 5),
("2024-10-12 11:30:00", 89.90, 77.20, 2, 1),
("2024-10-12 15:45:00", 91.80, 81.00, 3, 2),
("2024-10-12 20:15:00", 88.90, 79.40, 4, 3),
("2024-10-13 09:20:00", 86.40, 73.10, 1, 4),
("2024-10-13 13:00:00", 90.70, 76.30, 2, 5),
("2024-10-13 17:30:00", 88.10, 78.20, 3, 1),
("2024-10-13 21:40:00", 92.40, 80.80, 4, 2),
("2024-10-14 08:10:00", 85.80, 70.70, 1, 3),
("2024-10-15 12:30:00", 88.80, 75.10, 2, 4),
("2024-10-15 17:15:00", 90.90, 78.60, 3, 5),
("2024-10-15 22:20:00", 87.60, 74.30, 4, 1),
("2024-10-15 07:45:00", 85.70, 71.20, 1, 2),
("2024-10-15 13:15:00", 89.60, 76.40, 2, 3),
("2024-10-15 17:50:00", 91.70, 79.90, 3, 4),
("2024-10-15 21:10:00", 88.40, 73.90, 4, 5),
("2024-10-16 08:20:00", 86.30, 72.50, 1, 1),
("2024-10-16 12:40:00", 90.50, 77.10, 2, 2),
("2024-10-16 16:10:00", 88.60, 79.20, 3, 3),
("2024-10-16 19:40:00", 92.20, 80.50, 4, 4),
("2024-10-25 22:30:00", 92.00, 82.10, 4, 5),
("2024-10-14 08:20:00", 85.70, 70.40, 1, 1),
("2024-10-14 11:40:00", 89.60, 75.10, 2, 2),
("2024-10-14 16:15:00", 90.70, 78.70, 3, 3),
("2024-10-14 20:50:00", 87.50, 73.50, 4, 4),
("2024-10-14 07:55:00", 85.30, 72.50, 1, 5),
("2024-10-14 12:10:00", 89.80, 76.90, 2, 1),
("2024-10-14 17:00:00", 91.40, 80.00, 3, 2),
("2024-10-14 21:35:00", 88.90, 78.20, 4, 3), 	
("2024-10-14 09:00:00", 86.70, 73.10, 1, 4),
("2024-10-14 13:40:00", 90.30, 76.80, 2, 5),
("2024-10-14 17:30:00", 88.10, 79.50, 3, 1),
("2024-10-14 21:45:00", 92.60, 81.20, 4, 2),
("2024-10-29 08:30:00", 85.50, 70.80, 1, 3),
("2024-10-29 12:15:00", 89.70, 76.20, 2, 4),
("2024-10-29 17:20:00", 90.90, 79.10, 3, 5),
("2024-10-29 21:50:00", 87.90, 74.70, 4, 1),
("2024-10-30 09:30:00", 86.00, 72.00, 1, 2),
("2024-10-30 13:50:00", 90.60, 77.50, 2, 3),
("2024-10-30 18:20:00", 88.50, 80.00, 3, 4),
("2024-10-30 22:40:00", 92.70, 81.90, 4, 5),
("2024-02-05 21:35:00", 88.90, 78.20, 4, 3),
("2024-03-05 09:00:00", 86.70, 73.10, 1, 4),
("2024-04-05 13:40:00", 90.30, 76.80, 2, 5),
("2024-05-05 17:30:00", 88.10, 79.50, 3, 1),
("2024-06-05 21:45:00", 92.60, 81.20, 4, 2),
("2024-07-05 08:30:00", 85.50, 70.80, 1, 3),
("2024-08-05 12:15:00", 89.70, 76.20, 2, 4),
("2024-09-05 17:20:00", 90.90, 79.10, 3, 5),
("2024-10-05 21:50:00", 87.90, 74.70, 4, 1),
("2024-12-05 13:50:00", 90.60, 77.50, 2, 3);


-- Inserindo alertas para Higiene (13 alertas, fk_promocao = 7)
INSERT INTO alerta (data_hora, cpu_porcentagem, ram_porcentagem, fk_totem, fk_promocao) VALUES
("2024-11-01 00:00:00", 85.20, 70.40, 1, 7),
("2024-11-02 01:00:00", 85.50, 72.10, 2, 7),
("2024-11-03 02:00:00", 86.00, 71.00, 3, 7),
("2024-11-05 03:00:00", 87.20, 69.90, 4, 7),
("2024-11-05 04:00:00", 88.00, 68.00, 1, 7),
("2024-11-06 05:00:00", 89.00, 67.50, 2, 7),
("2024-11-07 06:00:00", 85.30, 70.20, 3, 7),
("2024-11-08 07:00:00", 84.80, 71.60, 4, 7),
("2024-11-09 08:00:00", 86.50, 69.40, 1, 7),
("2024-11-10 09:00:00", 85.70, 72.80, 2, 7),
("2024-11-11 10:00:00", 87.10, 73.00, 3, 7),
("2024-11-12 11:00:00", 88.20, 74.10, 4, 7),
("2024-11-13 12:00:00", 85.40, 70.90, 1, 7);

-- Inserindo alertas para Temperos (7 alertas, fk_promocao = 12)
INSERT INTO alerta (data_hora, cpu_porcentagem, ram_porcentagem, fk_totem, fk_promocao) VALUES
("2024-11-01 00:00:00", 85.20, 70.40, 1, 12),
("2024-11-02 01:00:00", 86.50, 71.50, 2, 12),
("2024-11-03 02:00:00", 87.30, 70.10, 3, 12),
("2024-11-04 03:00:00", 88.00, 69.50, 4, 12),
("2024-11-05 04:00:00", 85.10, 70.20, 1, 12),
("2024-11-06 05:00:00", 85.80, 71.40, 2, 12),
("2024-11-07 06:00:00", 86.20, 72.30, 3, 12);

-- Inserindo alertas para Refrigerantes (5 alertas, fk_promocao = 17)
INSERT INTO alerta (data_hora, cpu_porcentagem, ram_porcentagem, fk_totem, fk_promocao) VALUES
("2024-11-01 00:00:00", 85.20, 70.40, 1, 17),
("2024-11-02 01:00:00", 86.40, 72.10, 2, 17),
("2024-11-03 02:00:00", 87.50, 70.90, 3, 17),
("2024-11-04 03:00:00", 88.30, 71.20, 4, 17),
("2024-11-05 04:00:00", 85.70, 72.40, 1, 17);
-- GISELE

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

-- select.sql:

select * from endereco;

select * from empresa;

select * from filial;

select * from promocao;

select * from funcionario;

select * from totem;

select * from alerta;

create table TotensProblema(
  id int primary key auto_increment,
  data_hora timestamp default current_timestamp,
  cpu_porcentagem decimal(6, 2),
  ram_porcentagem decimal(6, 2),
  fk_totem int not null,
  fk_promocao int,
  
  constraint TotensProblema_fk_totem foreign key (fk_totem) references totem(id),
  constraint TotensProblema_fk_promocao foreign key (fk_promocao) references promocao(id)
);

create table monitoramento(
  id int primary key auto_increment,
  data_hora timestamp default current_timestamp,
  cpu_porcentagem decimal(6, 2),
  ram_porcentagem decimal(6, 2),
  fk_totem int not null,
  fk_promocao int,
  
  constraint monitoramento_fk_totem foreign key (fk_totem) references totem(id),
  constraint monitoramento_fk_promocao foreign key (fk_promocao) references promocao(id)
);
