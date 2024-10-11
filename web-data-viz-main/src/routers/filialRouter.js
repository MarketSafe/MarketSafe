// filialRouter.js:

// dependências:
//   importação da framework "express":
const express = require("express");

//   importação do arquivo `filialController.js`:
const filialController = require("../controllers/filialController.js");

// declaração da variável do roteador:
const router = express.Router();

// envia a requisição do tipo post "/cadastrar" para a função `cadastrar` do `filialController.js`:
router.post("/cadastrar", function (req, res) {
  filialController.cadastrar(req, res);
});

// envia a requisição do tipo post "/listar" para a função `listar` do `filialController.js`:
router.post("/listar", function (req, res) {
  filialController.listar(req, res);
});

// exporta a variável de roteador do arquivo `filialRouter.js`:
module.exports = router;
