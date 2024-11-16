const rankingModel = require('../models/rankingModel');

function atualizarTabela(req, res) {
    const limite_linhas = 3;
    const { filial } = req.query; 

    if (filial) {
        console.log(`Recuperando dados para a filial: ${filial}`);
        
        rankingModel.buscarPorFilial(filial) // Chama o método de busca por filial
            .then(resultado => {
                if (resultado.length > 0) {
                    res.status(200).json(resultado); // Retorna os dados
                } else {
                    res.status(204).send("Nenhum resultado encontrado para a filial!");
                }
            })
            .catch(erro => {
                console.error("Erro ao buscar dados para a filial:", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    } else {
        // Se não for fornecida a filial, retorna as promoções com mais alertas
        console.log(`Recuperando as promoções com mais alertas`);
        
        rankingModel.atualizarTabela(limite_linhas)
            .then(resultado => {
                if (resultado.length > 0) {
                    res.status(200).json(resultado);
                } else {
                    res.status(204).send("Nenhum resultado encontrado para a tabela!");
                }
            })
            .catch(erro => {
                console.error("Erro ao buscar promoções:", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function classificacao(req, res) {

    rankingModel.Obterclassificacao()
        .then(result => {
            if (result.length > 0) {
                res.status(200).json(result);
            } else {
                res.status(204).send("Nenhuma classificação encontrada!");
            }
        })
        .catch(erro => {
            console.error('Erro ao obter classificação:', erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    atualizarTabela,
    classificacao,
};
