CREATE DATABASE desafio;

use desafio;

create table info(
idDados INT AUTO_INCREMENT PRIMARY KEY,
data TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
Processador decimal(5,2),
Memoria decimal(5,2), 
MemoriaUsada bigint,
maquina int
);

truncate table info;

select * from info;


