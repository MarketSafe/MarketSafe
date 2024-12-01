// benchmarkGerenteRouter.js:

// dependências:
//   importa a framework "express":
const express = require("express");

//   importa o arquivo `benchmarkGerenteController.js`:
const benchmarkGerenteController = require("../../controllers/dashboards/benchmarkGerenteController.js");

// declara a variável do roteador:
const router = express.Router();

// envia a requisição do tipo post "/estadoFiliais" para a função `estadoFiliais` do `benchmarkGerenteController.js`:
router.post("/estadoFiliais", benchmarkGerenteController.estadoFiliais);

// envia a requisição do tipo post "/maioresTaxasDeAlerta" para a função `maioresTaxasDeAlerta` do `benchmarkGerenteController.js`:
router.post("/maioresTaxasDeAlerta", benchmarkGerenteController.maioresTaxasDeAlerta);

// envia a requisição do tipo post "/taxaGeralDeAlertas" para a função `taxaGeralDeAlertas` do `benchmarkGerenteController.js`:
router.post("/taxaGeralDeAlertas", benchmarkGerenteController.taxaGeralDeAlertas);

// envia a requisição do tipo post "/totensPorEmpresa" para a função `totensPorEmpresa` do `benchmarkGerenteController.js`:
router.post("/totensPorEmpresa", benchmarkGerenteController.totensPorEmpresa);

// envia a requisição do tipo post "/maiorTaxaDeAlertas" para a função `maiorTaxaDeAlertas` do `benchmarkGerenteController.js`:
router.post("/maiorTaxaDeAlertas", benchmarkGerenteController.maiorTaxaDeAlertas);

// envia a requisição do tipo post "/totalDeFiliais" para a função `totalDeFiliais` do `benchmarkGerenteController.js`:
router.post("/totalDeFiliais", benchmarkGerenteController.totalDeFiliais);

// exporta a variável de roteador do arquivo `benchmarkGerenteRouter.js`:
module.exports = router;
