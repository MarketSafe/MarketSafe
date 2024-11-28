const express = require("express");

const router = express.Router();

const historicoLeoController = require("../controllers/historicoLeoController");

router.get("/cadastrarMes", function(req, res){
    historicoLeoController.cadastrarMes(req, res); 
})

router.get("/cadastrarDiaInicio", function(req, res){
    historicoLeoController.cadastrarDiaInicio(req, res); 
})

router.get("/cadastrarDiaFim", function(req, res){
    historicoLeoController.cadastrarDiaFim(req, res); 
})

router.get("/cadastrarRanking", function(req, res){
    historicoLeoController.cadastrarRanking(req, res); 
})

router.get("/cadastrarTaxa", function(req, res){
    historicoLeoController.cadastrarTaxa(req, res); 
})

router.get("/cadastrarHora", function(req, res){
    historicoLeoController.cadastrarHora(req, res); 
})

router.get("/atualizarRanking_mes", function(req, res){
    historicoLeoController.atualizarRanking_mes(req, res); 
})

router.get("/atualizarMesRanking", function(req, res){
    const mes = req.query.mes;
    historicoLeoController.atualizarMesRanking(req, res, mes); 
})

router.get("/atualizarMesTaxa", function(req, res){
    const mes = req.query.mes;
    historicoLeoController.atualizarMesTaxa(req, res, mes); 
})

router.get("/atualizarMesEspecifico", function(req, res){
    const mes = req.query.mes;
    historicoLeoController.atualizarMesEspecifico(req, res, mes); 
})

router.get("/maisAlerta", function(req, res){
    historicoLeoController.maisAlerta(req, res); 
})

router.get("/atualizarMaisAlerta", function(req, res){
    const mes = req.query.mes;
    historicoLeoController.atualizarMaisAlerta(req, res, mes); 
})

router.get("/alertaSemana", function(req, res){
    historicoLeoController.alertaSemana(req, res); 
})

router.get("/atualizarAlertaSemana", function(req, res){
    const mes = req.query.mes;
    historicoLeoController.atualizarAlertaSemana(req, res, mes); 
})

router.get("/mediaHorario", function(req, res){
    historicoLeoController.mediaHorario(req, res); 
})

router.get("/atualizarMediaHorario", function(req, res){
    const mes = req.query.mes;
    historicoLeoController.atualizarMediaHorario(req, res, mes); 
})
module.exports = router;