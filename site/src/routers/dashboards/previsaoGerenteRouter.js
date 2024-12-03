var express = require("express");
var router = express.Router();

var previsaoGerenteController = require("../../controllers/dashboards/previsaoGerenteController");

router.post("/puxarDadosLine/:idFilial/:anoMes", function (req, res) {
    previsaoGerenteController.puxarDadosLine(req, res);
});

router.post("/puxarDadosBubble/:idFilial/:anoMes/:idPromocao", function (req, res) {
    previsaoGerenteController.puxarDadosBubble(req, res);
});

router.post("/plotarRanking", function (req, res) {
    previsaoGerenteController.plotarRanking(req, res);
});

module.exports = router;