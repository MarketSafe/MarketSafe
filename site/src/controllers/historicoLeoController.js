var historicoLeoModel = require("../models/historicoLeoModel");

function cadastrarMes(req, res) {
    const { mes, semana_do_mes } = req.params;
    historicoLeoModel.cadastrarMes(mes, semana_do_mes)
        .then(resultado => {
            if (resultado.length > 0) {
                // Se resultados forem encontrados, envia os dados
                res.status(200).json(resultado);
            } else {
                // Se não houver resultados, envia um status 404
                res.status(404).json({ mensagem: "Nenhum dado encontrado para este período." });
            }
        })
        .catch(erro => {
            console.error("Erro ao buscar dados:", erro);
            res.status(500).json({ mensagem: "Erro no servidor ao buscar os dados." });
        });
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
                res.status(200).json(resultado);
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

function alertaSemana(req, res) {
    historicoLeoModel.alertaSemana()
        .then(resultado => {
            if (resultado.length > 0) {
                res.json(resultado);
            } 
        })
}

function atualizarAlertaSemana(req, res, mes) {
    historicoLeoModel.atualizarAlertaSemana(mes)
        .then(resultado => {
            if (resultado.length > 0) {
                res.json(resultado);
            } 
        })
}

function mediaHorario(req, res) {
    historicoLeoModel.mediaHorario()
        .then(resultado => {
            if (resultado.length > 0) {
                res.json(resultado);
            } 
        })
}

function atualizarMediaHorario(req, res, mes) {
    // console.log(req.query)
    historicoLeoModel.atualizarMediaHorario(mes)
        .then(resultado => {
            if (resultado.length > 0) {
                res.json(resultado);
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