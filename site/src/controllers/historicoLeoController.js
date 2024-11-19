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

module.exports = {
    cadastrarMes,
    cadastrarDia,
    cadastrarRanking,
    cadastrarTaxa,
    cadastrarHora
  }