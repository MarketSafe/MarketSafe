// funcionarioRouter.js:

// dependências:
//   importação da framework "express":
const express = require("express");

//   importação do arquivo `funcionarioController.js`:
const funcionarioController = require("../controllers/funcionarioController.js");

// declaração da variável do roteador:
const router = express.Router();

// envia a requisição do tipo post "/cadastrar" para a função `cadastrar` do `funcionarioController.js`:
router.post("/cadastrar", function (req, res) {
  funcionarioController.cadastrar(req, res);
});

// envia a requisição do tipo post "/autenticar" para função `autenticar` do `funcionarioController.js`:
router.post("/autenticar", function (req, res) {
  funcionarioController.autenticar(req, res);
});

// exporta a variável de roteador do arquivo `funcionarioRouter.js`:
module.exports = router;
