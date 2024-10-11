// totemRouter.js:

// dependências:
//   importação da framework "express":
const express = require("express");

//   importação do arquivo `totemController.js`:
const totemController = require("../controllers/totemController.js");

// declaração da variável do roteador:
const router = express.Router();

// envia a requisição do tipo post "/cadastrar" para a função `cadastrar` do `totemController.js`:
router.post("/cadastrar", function (req, res) {
  totemController.cadastrar(req, res);
});

// envia a requisição do tipo post "/listar" para a função `listar` do `totemController.js`:
router.post("/listar", function (req, res) {
  totemController.listar(req, res);
});

// exporta a variável de roteador do arquivo `totemRouter.js`:
module.exports = router;
