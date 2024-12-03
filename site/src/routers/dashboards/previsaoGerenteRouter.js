var express = require("express");
var router = express.Router();

var previsaoGerenteController = require("../../controllers/dashboards/previsaoGerenteController");

router.post("/puxarDados/:idFilial/:anoMes", function (req, res) {
    previsaoGerenteController.puxarDados(req, res);
});

router.post("/plotarRanking", function (req, res) {
    previsaoGerenteController.plotarRanking(req, res);
});

module.exports = router;