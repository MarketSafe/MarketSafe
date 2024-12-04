var previsaoGerenteModel = require("../../models/dashboards/previsaoGerenteModel");

function puxarDadosLine(req, res) {
    var idFilial = req.params.idFilial;
    var idEmpresa = req.body.funcionarioAutenticado.fk_empresa;

    console.log(`Puxando dados da Filial ${idFilial} da empresa ${idEmpresa}.`);

    previsaoGerenteModel.puxarDadosLine(idFilial, idEmpresa
    )
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!");
            }
        }).catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar os resultados.", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function puxarDadosBubble(req, res) {
    var idFilial = req.params.idFilial;
    var idEmpresa = req.body.funcionarioAutenticado.fk_empresa;
    var idPromocao = req.params.idPromocao;

    console.log(`Puxando dados da Filial ${idFilial} da empresa ${idEmpresa} da promoção ${idPromocao}.`)

    previsaoGerenteModel.puxarDadosBubble(idFilial, idEmpresa, idPromocao
    )
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!");
            }
        }).catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar os resultados.", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function plotarRanking(req, res) {

    console.log(`Puxando o ranking das 3 maiores taxas de sobrecarga em relação à promoções.`);

    previsaoGerenteModel.plotarRanking(
    )
        .then(function (resposta) {
            if(resposta.length >= 1) {
                res.status(200).json(resposta)
            } else {
                res.status(204).send("Nenhum resultado encontrado!");
            }
        }).catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar os resultados.", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function puxarFiliais(req, res) {
    var idEmpresa = req.body.funcionarioAutenticado.fk_empresa;

    console.log(`Puxando as filiais da empresa ${idEmpresa}.`)

    previsaoGerenteModel.puxarFiliais(idEmpresa
    )
        .then(function (resposta) {
            if(resposta.length >= 1) {
                res.status(200).json(resposta)
            } else {
                res.status(204).send("Nenhum resultado encontrado!");
            }
        }).catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar os resultados.", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function puxarPromocoes(req, res) {
    var idFilial = req.params.idFilial;

    console.log(`Puxando as promoções da filial ${idFilial}.`)

    previsaoGerenteModel.puxarPromocoes(idFilial
    )
        .then(function (resposta) {
            if(resposta.length >= 1) {
                res.status(200).json(resposta)
            } else {
                res.status(204).send("Nenhum resultado encontrado!");
            }
        }).catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar os resultados.", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    puxarDadosLine,
    puxarDadosBubble,
    plotarRanking,
    puxarFiliais,
    puxarPromocoes
}