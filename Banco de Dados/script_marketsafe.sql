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

alter table maquina add constraint foreign key fkMaquinaEmpresa (fkempresa) references empresa (idempresa);

alter table registro add constraint foreign key fkRegistroMaquina (fkmaquina) references maquina (idmaquina);