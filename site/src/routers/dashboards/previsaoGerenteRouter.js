var express = require("express");
var router = express.Router();

var previsaoGerenteController = require("../../controllers/dashboards/previsaoGerenteController");

router.post("/puxarDados/:idFilial/:mes", function (req, res) {
    previsaoGerenteController.puxarDados(req, res);
});

module.exports = router;