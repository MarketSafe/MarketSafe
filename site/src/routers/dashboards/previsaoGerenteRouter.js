var express = require("express");
var router = express.Router();

var previsaoGerenteController = require("../../controllers/dashboards/previsaoGerenteController");

router.post("/puxarDadosLine/:idFilial", function (req, res) {
    previsaoGerenteController.puxarDadosLine(req, res);
});

router.post("/puxarDadosBubble/:idFilial/:idPromocao", function (req, res) {
    previsaoGerenteController.puxarDadosBubble(req, res);
});

router.post("/plotarRanking", function (req, res) {
    previsaoGerenteController.plotarRanking(req, res);
});

router.post("/puxarFiliais", function (req, res) {
    previsaoGerenteController.puxarFiliais(req, res)
});

router.post("/puxarPromocoes/:idFilial", function (req, res) {
    previsaoGerenteController.puxarPromocoes(req, res)
});

module.exports = router;