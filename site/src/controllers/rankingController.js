const rankingModel = require('../models/rankingModel');

function atualizarTabela(req, res) {
    const limite_linhas = 3;
    
    console.log(`Recuperando as ${limite_linhas} promoções com mais alertas`);

    rankingModel.atualizarTabela(limite_linhas)  
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado); 
            } else {
                res.status(204).send("Nenhum resultado encontrado!");
            }
        })
        .catch(function (erro) {
            console.error(erro);
            console.log("Houve um erro ao buscar as promoções.", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}
function classificacao(req, res) {
    rankingModel.Obterclassificacao()
        .then(result => res.status(200).json(result))
        .catch(erro => {
            console.error('Erro ao obter classificação:', erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    atualizarTabela,
    classificacao,
};