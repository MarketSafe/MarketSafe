const express = require("express");
const promocaoController = require("../controllers/promocaoController.js");

// Declara a variável do roteador:
const promocaoRouter = express.Router();

// Define a rota para cadastrar promoção:
promocaoRouter.post("/cadastrar", function (req, res) {
    promocaoController.cadastrarPromocao(req, res);
});

module.exports = promocaoRouter;
