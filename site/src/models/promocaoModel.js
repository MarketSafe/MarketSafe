const database = require("../database/config");

function cadastrarPromocao(nomePromocao, fk_filial) {
  const query = `
    INSERT INTO promocao (nome, fk_filial) 
    VALUES ${nomePromocao}, ${fk_filial};
  `;
  return database.executar(query);
}

module.exports = { cadastrarPromocao };
