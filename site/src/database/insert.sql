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
