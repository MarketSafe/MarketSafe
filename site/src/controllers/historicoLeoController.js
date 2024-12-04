var historicoLeoModel = require("../models/historicoLeoModel");

function cadastrarMes(req, res, mes, semana_do_mes) {
    historicoLeoModel.cadastrarMes(mes, semana_do_mes)
        .then(resultado => {
            if (resultado.length > 0) {
                res.json(resultado);
            } else {
                res.status(201).json(resultado);
            }
        })
}


function cadastrarRanking(req, res) {
    historicoLeoModel.cadastrarRanking()
        .then(resultado => {
            if (resultado.length > 0) {
                res.json(resultado);
            } else {
                res.status(201).json(resultado);
            }
        })
}

function cadastrarTaxa(req, res) {
    historicoLeoModel.cadastrarTaxa()
        .then(resultado => {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(201).json(resultado);
            }
        })
}

function cadastrarHora(req, res) {
    historicoLeoModel.cadastrarHora()
        .then(resultado => {
            if (resultado.length > 0) {
                res.json(resultado);
            } else {
                res.status(201).json(resultado);
            }
        })
}

function atualizarMesTaxa(req, res, mes, semana_do_mes) {
    historicoLeoModel.atualizarMesTaxa(mes, semana_do_mes)
        .then(resultado => {
            if (resultado.length > 0) {
                res.json(resultado);
            } else {
                res.status(201).json(resultado);
            }
        })
}

function atualizarMesEspecifico(req, res, mes, semana_do_mes) {
    historicoLeoModel.atualizarMesEspecifico(mes, semana_do_mes)
        .then(resultado => {
            if (resultado.length > 0) {
                res.json(resultado);
            } else {
                res.status(201).json(resultado);
            }
        })
}

function atualizarMesRanking(req, res, mes, semana_do_mes) {
    historicoLeoModel.atualizarMesRanking(mes, semana_do_mes)
        .then(resultado => {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(201).json(resultado);
            }
        })
}

function maisAlerta(req, res) {
    historicoLeoModel.maisAlerta()
        .then(resultado => {
            if (resultado.length > 0) {
                res.json(resultado);
            } else {
                res.status(201).json(resultado);
            }
        })
}

function atualizarMaisAlerta(req, res, mes, semana_do_mes) {
    historicoLeoModel.atualizarMaisAlerta(mes, semana_do_mes)
        .then(resultado => {
            if (resultado.length > 0) {
                res.json(resultado);
            } else {
                res.status(201).json(resultado);
            }
        })
}

function alertaSemana(req, res) {
    historicoLeoModel.alertaSemana()
        .then(resultado => {
            if (resultado.length > 0) {
                res.json(resultado);
            } else {
                res.status(201).json(resultado);
            }
        })
}

function atualizarAlertaSemana(req, res, mes, semana_do_mes) {
    historicoLeoModel.atualizarAlertaSemana(mes, semana_do_mes)
        .then(resultado => {
            if (resultado.length > 0) {
                res.json(resultado);
            } else {
                res.status(201).json(resultado);
            }
        })
}

function mediaHorario(req, res) {
    historicoLeoModel.mediaHorario()
        .then(resultado => {
            if (resultado.length > 0) {
                res.json(resultado);
            } else {
                res.status(201).json(resultado);
            }
        })
}

function atualizarMediaHorario(req, res, mes, semana_do_mes) {
    // console.log(req.query)
    historicoLeoModel.atualizarMediaHorario(mes, semana_do_mes)
        .then(resultado => {
            if (resultado.length > 0) {
                res.json(resultado);
            } else {
                res.status(201).json(resultado);
            }
        })
}

module.exports = {
    cadastrarMes,
    cadastrarRanking,
    cadastrarTaxa,
    cadastrarHora,
    atualizarMesTaxa,
    atualizarMesEspecifico,
    atualizarMesRanking,
    maisAlerta,
    atualizarMaisAlerta,
    alertaSemana,
    atualizarAlertaSemana,
    mediaHorario,
    atualizarMediaHorario
}