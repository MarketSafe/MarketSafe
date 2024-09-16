create database marketsafe;
use marketsafe;

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
fkempresa int);

CREATE TABLE registro (
    idregistro int primary key auto_increment,
    media decimal(5,2),
    consumo decimal(5,2),
    fkmaquina int
);

CREATE TABLE usuario (
	idUsuario INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(50),
	email VARCHAR(50),
	senha VARCHAR(50)
);

alter table maquina add constraint foreign key fkMaquinaEmpresa (fkempresa) references empresa (idempresa);

alter table registro add constraint foreign key fkRegistroMaquina (fkmaquina) references maquina (idmaquina);

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