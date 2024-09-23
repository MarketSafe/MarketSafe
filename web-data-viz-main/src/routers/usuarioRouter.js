// dependências:
//   importação da framework "express":
const express = require("express");

//   importação do usuarioController.js:
const usuarioController = require("../controllers/usuarioController");

// variável do roteador:
const router = express.Router();

// envia a requisição do tipo post /cadastrar para o controller:
router.post("/cadastrar", function (req, res) {
  usuarioController.cadastrar(req, res);
});

// envia a requisição do tipo post /autenticar para o controller:
router.post("/autenticar", function (req, res) {
  usuarioController.autenticar(req, res);
});

// exporta o roteador:
module.exports = router;
