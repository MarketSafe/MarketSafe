// alertaRouter.js:

// dependências:
//   importação da framework "express":
const express = require("express");

//   importação do arquivo `alertaController.js`:
const alertaController = require("../controllers/alertaController.js");

// declaração da variável do roteador:
const router = express.Router();

// envia a requisição do tipo post "/listar" para a função `cadastrar` do `alertaController.js`:
router.post("/listar", function (req, res) {
  alertaController.listar(req, res);
});

// envia a requisição do tipo post "/listarPorFilial" para a função `cadastrar` do `alertaController.js`:
router.post("/listarPorFilial", function (req, res) {
  alertaController.listarPorFilial(req, res);
});

// exporta a variável de roteador do arquivo `alertaRouter.js`:
module.exports = router;
