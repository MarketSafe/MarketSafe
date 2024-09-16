-- Script Correto
drop database if exists marketsafe;
create database marketsafe;
use marketsafe;
drop database marketsafe;
create table funcionario 
(idfunc int primary key auto_increment,
nome varchar(45),
cpf char(11),
cargo varchar(45),
senha varchar(45),
email varchar(45),
telefone char(11),
fkempresa int);

create table empresa 
(idempresa int primary key auto_increment,
nome varchar(45),
cep char(9),
cnpj char(14),
rua varchar(45),
logradouro varchar(45),
numero int);

alter table funcionario add constraint foreign key fkFuncionarioEmpresa (fkempresa) references empresa (idempresa);

create table maquina 
(idmaquina int primary key auto_increment,
sistema_operacional varchar(45),
marca varchar(45),
hostname varchar(45),
fkempresa int);

create table registro(
idDados INT AUTO_INCREMENT PRIMARY KEY,
data TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
Processador float,
Memoria float, 
MemoriaUsada bigint,
fkmaquina int
);

alter table maquina add constraint foreign key fkMaquinaEmpresa (fkempresa) references empresa (idempresa);

alter table registro add constraint foreign key fkRegistroMaquina (fkmaquina) references maquina (idmaquina);

-- drop database marketsafe;

-- CREATE USER 'usuario'@'%' IDENTIFIED BY 'usuario123';
-- GRANT ALL PRIVILEGES ON marketsafe.* TO 'usuario'@'%' with grant option;
-- FLUSH PRIVILEGES;
-- select * from registro;
-- truncate table registro;
-- select * from maquina;

-- drop user 'mktsAdm'@'%';
create user if not exists 'mktsAdm'@'%' identified by 'sptech';
grant all privileges on marketsafe.* to 'mktsAdm'@'%';

-- drop user 'mktsUser'@'%';
create user if not exists 'mktsUser'@'%' identified by 'sptech';
grant insert, select on marketsafe.* to 'mktsUser'@'%';

-- drop user 'mktsUserInsert'@'%';
create user if not exists 'mktsUserInsert'@'%' identified by 'sptech';
grant insert on marketsafe.* to 'mktsUserInsert'@'%';

-- drop user 'mktsUserSelect'@'%';
create user if not exists 'mktsUserSelect'@'%' identified by 'sptech';
grant select on marketsafe.* to 'mktsUserSelect'@'%';