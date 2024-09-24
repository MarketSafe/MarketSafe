// maquinaRouter.js:

// dependências:
//   importação da framework "express":
const express = require("express");

//   importação do arquivo `maquinaController.js`:
const maquinaController = require("../controllers/maquinaController.js");

// declaração da variável do roteador:
const router = express.Router();

// envia a requisição do tipo post "/cadastrar" para a função `cadastrar` do `maquinaController.js`:
router.post("/cadastrar", function (req, res) {
  maquinaController.cadastrar(req, res);
});

router.post("/listar", function (req, res) {
  maquinaController.listar(req, res);
});

// exporta a variável de roteador do arquivo `maquinaRouter.js`:
module.exports = router;
