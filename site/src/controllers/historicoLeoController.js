var historicoLeoModel = require("../models/historicoLeoModel");

function cadastrarMes(req, res) {
    historicoLeoModel.cadastrarMes()
        .then(resultado => {
            if (resultado.length > 0) {
                res.json(resultado);
            } 
        })
}

function cadastrarDia(req, res) {
    historicoLeoModel.cadastrarDia()
        .then(resultado => {
            if (resultado.length > 0) {
                res.json(resultado);
            } 
        })
}

function cadastrarRanking(req, res) {
    historicoLeoModel.cadastrarRanking()
        .then(resultado => {
            if (resultado.length > 0) {
                res.json(resultado);
            } 
        })
}

function cadastrarTaxa(req, res) {
    historicoLeoModel.cadastrarTaxa()
        .then(resultado => {
            if (resultado.length > 0) {
                res.json(resultado);
            } 
        })
}

function cadastrarHora(req, res) {
    historicoLeoModel.cadastrarHora()
        .then(resultado => {
            if (resultado.length > 0) {
                res.json(resultado);
            } 
        })
}

function atualizarMesTaxa(req, res, mes) {
    historicoLeoModel.atualizarMesTaxa(mes)
        .then(resultado => {
            if (resultado.length > 0) {
                res.json(resultado);
            } 
        })
}

function atualizarMesEspecifico(req, res, mes) {
    historicoLeoModel.atualizarMesEspecifico(mes)
        .then(resultado => {
            if (resultado.length > 0) {
                res.json(resultado);
            } 
        })
}

function atualizarMesRanking(req, res, mes) {
    historicoLeoModel.atualizarMesRanking(mes)
        .then(resultado => {
            if (resultado.length > 0) {
                res.json(resultado);
            } 
        })
}

function maisAlerta(req, res) {
    historicoLeoModel.maisAlerta()
        .then(resultado => {
            if (resultado.length > 0) {
                res.json(resultado);
            } 
        })
}

function atualizarMaisAlerta(req, res, mes) {
    historicoLeoModel.atualizarMaisAlerta(mes)
        .then(resultado => {
            if (resultado.length > 0) {
                res.json(resultado);
            } 
        })
}

module.exports = {
    cadastrarMes,
    cadastrarDia,
    cadastrarRanking,
    cadastrarTaxa,
    cadastrarHora,
    atualizarMesTaxa,
    atualizarMesEspecifico,
    atualizarMesRanking,
    maisAlerta,
    atualizarMaisAlerta
  }