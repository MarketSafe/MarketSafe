-- insert.sql:

insert into endereco (cep, bairro, rua, numero, complemento) values ("123-45678", "bairro", "rua", 0, "complemento");

insert into empresa (razao_social, nome_fantasia, cnpj, email, telefone, fk_endereco) values ("razao_social", "nome_fantasia", "12.345.678/9012-34", "email", "telefone", 1);

insert into funcionario (nome, cpf, cargo, email, senha, telefone, fk_empresa) values ("nome", "123.456.789-01", "gerente", "email", "senha", "+12 (34) 56789-0123", 1);

insert into filial (fk_empresa, fk_endereco) values (1, 1);

insert into totem (mac_address, fk_filial) values ("abc", 1);
