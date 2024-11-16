// alertaRouter.js:

// dependências:
//   importa a framework "express":
const express = require("express");

//   importa o arquivo `alertaController.js`:
const alertaController = require("../controllers/alertaController.js");

// declara a variável do roteador:
const router = express.Router();

// envia a requisição do tipo post "/listarPorEmpresa" para a função `listarPorEmpresa` do `alertaController.js`:
router.post("/listarPorEmpresa", function (req, res) {
  alertaController.listarPorEmpresa(req, res);
});

// envia a requisição do tipo post "/listarPorFilial" para a função `listarPorFilial` do `alertaController.js`:
router.post("/listarPorFilial", function (req, res) {
  alertaController.listarPorFilial(req, res);
});

// exporta a variável de roteador do arquivo `alertaRouter.js`:
module.exports = router;
