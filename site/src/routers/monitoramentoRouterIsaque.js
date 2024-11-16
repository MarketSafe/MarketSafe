const express = require("express");

const router = express.Router();

var IsaqueController = require("../controllers/monitoramentoControllerIsaque");

router.post("/AtualizarValorT1", function (req, res) {
    IsaqueController.Atualizar_ValorT1(req, res);
});

module.exports = router;