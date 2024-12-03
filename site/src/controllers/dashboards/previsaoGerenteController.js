var previsaoGerenteModel = require("../../models/dashboards/previsaoGerenteModel");

function puxarDados(req, res) {
    var idFilial = req.params.idFilial;
    var idEmpresa = req.body.funcionarioAutenticado.fk_empresa;
    var anoMes = req.params.anoMes;

    console.log(`Puxando dados da Filial ${idFilial} da empresa ${idEmpresa} do mês ${anoMes}.`);

    previsaoGerenteModel.puxarDados(idFilial, idEmpresa, anoMes
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

module.exports = {
    puxarDados
}