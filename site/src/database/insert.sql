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
