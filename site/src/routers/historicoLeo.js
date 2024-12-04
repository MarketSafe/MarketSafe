const express = require("express");

const router = express.Router();

const historicoLeoController = require("../controllers/historicoLeoController");

router.get("/cadastrarMes", function(req, res){
    const mes = req.query.mes;
    const semana_do_mes = req.query.semana_do_mes;
    historicoLeoController.cadastrarMes(req, res, mes, semana_do_mes); 
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
    const semana_do_mes = req.query.semana_do_mes;
    historicoLeoController.atualizarMesRanking(req, res, mes, semana_do_mes); 
})

router.get("/atualizarMesTaxa", function(req, res){
    const mes = req.query.mes;
    const semana_do_mes = req.query.semana_do_mes;
    historicoLeoController.atualizarMesTaxa(req, res, mes, semana_do_mes); 
})

router.get("/atualizarMesEspecifico", function(req, res){
    const mes = req.query.mes;
    const semana_do_mes = req.query.semana_do_mes;
    historicoLeoController.atualizarMesEspecifico(req, res, mes, semana_do_mes); 
})

router.get("/maisAlerta", function(req, res){
    historicoLeoController.maisAlerta(req, res); 
})

router.get("/atualizarMaisAlerta", function(req, res){
    const mes = req.query.mes;
    const semana_do_mes = req.query.semana_do_mes;
    historicoLeoController.atualizarMaisAlerta(req, res, mes, semana_do_mes); 
})

router.get("/alertaSemana", function(req, res){
    historicoLeoController.alertaSemana(req, res); 
})

router.get("/atualizarAlertaSemana", function(req, res){
    const mes = req.query.mes;
    const semana_do_mes = req.query.semana_do_mes;
    historicoLeoController.atualizarAlertaSemana(req, res, mes, semana_do_mes); 
})

router.get("/mediaHorario", function(req, res){
    historicoLeoController.mediaHorario(req, res); 
})

router.get("/atualizarMediaHorario", function(req, res){
    const mes = req.query.mes;
    const semana_do_mes = req.query.semana_do_mes;
    historicoLeoController.atualizarMediaHorario(req, res, mes, semana_do_mes); 
})
module.exports = router;