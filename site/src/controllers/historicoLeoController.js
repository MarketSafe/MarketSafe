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

module.exports = {
    cadastrarMes,
    cadastrarDia
  }