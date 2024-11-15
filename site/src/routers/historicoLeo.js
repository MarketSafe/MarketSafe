const express = require("express");

const router = express.Router();

const historicoLeoController = require("../controllers/historicoLeoController");

router.get("/cadastrarMes", function(req, res){
    historicoLeoController.cadastrarMes(req, res); // Faz a rota dos servidores
})

router.get("/cadastrarDia", function(req, res){
    historicoLeoController.cadastrarDia(req, res); // Faz a rota dos servidores
})

module.exports = router;