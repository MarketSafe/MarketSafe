const express = require("express");

const router = express.Router();

const historicoLeoController = require("../controllers/historicoLeoController");

router.get("/cadastrarMes", function(req, res){
    historicoLeoController.cadastrarMes(req, res); // Faz a rota dos servidores
})

router.get("/cadastrarDia", function(req, res){
    historicoLeoController.cadastrarDia(req, res); // Faz a rota dos servidores
})

router.get("/cadastrarRanking", function(req, res){
    historicoLeoController.cadastrarRanking(req, res); // Faz a rota dos servidores
})

router.get("/cadastrarTaxa", function(req, res){
    historicoLeoController.cadastrarTaxa(req, res); // Faz a rota dos servidores
})

router.get("/cadastrarHora", function(req, res){
    historicoLeoController.cadastrarHora(req, res); // Faz a rota dos servidores
})

router.get("/atualizarRanking_mes", function(req, res){
    historicoLeoController.atualizarRanking_mes(req, res); // Faz a rota dos servidores
})

module.exports = router;