var IsaqueModel = require("../models/monitoramentoModelIsaque");

function Atualizar_ValorT1(req, res) {

    IsaqueModel.Atualizar_ValorT1()
        .then(function (resultado) {
            if (resultado.length > 0) {
     
                res.status(200).json(resultado)
            } else {
     
                res.status(204).send("Nenhum resultado encontrado!");
            }
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao buscar o rank! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    Atualizar_ValorT1
};
