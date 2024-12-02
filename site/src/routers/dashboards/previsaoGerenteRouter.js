var express = require("express");
var router = express.Router();

var previsaoGerenteController = require("../../controllers/dashboards/previsaoGerenteController");

router.get("/puxarDados/:idFilial", function (req, res) {
    previsaoGerenteController.puxarDados(req, res);
});

module.exports = router;