// benchmarkGerenteRouter.js:

// dependências:
//   importa a framework "express":
const express = require("express");

//   importa o arquivo `util.js`:
const funcionarioModel = require("../../../util/util.js");
//   importa o arquivo `benchmarkGerenteController.js`:
const benchmarkGerenteController = require("../../controllers/dashboards/benchmarkGerenteController.js");

// declara a variável do roteador:
const router = express.Router();

// envia a requisição do tipo post "/estadoFiliais" para a função `estadoFiliais` do `benchmarkGerenteController.js`:
router.post(
  "/estadoFiliais",
  funcionarioModel.auth,
  benchmarkGerenteController.estadoFiliais
);

// exporta a variável de roteador do arquivo `benchmarkGerenteRouter.js`:
module.exports = router;
