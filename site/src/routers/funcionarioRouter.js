// funcionarioRouter.js:

// dependências:
//   importa a framework "express":
const express = require("express");

//   importa o arquivo `funcionarioController.js`:
const funcionarioController = require("../controllers/funcionarioController.js");

// declara a variável do roteador:
const router = express.Router();

// envia a requisição do tipo post "/autenticar" para função `autenticar` do `funcionarioController.js`:
router.post("/autenticar", function (req, res) {
  funcionarioController.autenticar(req, res);
});

// envia a requisição do tipo post "/cadastrar" para a função `cadastrar` do `funcionarioController.js`:
router.post("/cadastrar", function (req, res) {
  funcionarioController.cadastrar(req, res);
});

// exporta a variável de roteador do arquivo `funcionarioRouter.js`:
module.exports = router;
