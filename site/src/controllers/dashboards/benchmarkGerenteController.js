// benchmarkGerenteController.js:

// dependências:
//   importa o arquivo `benchmarkGerenteModel.js`:
const benchmarkGerenteModel = require("../../models/dashboards/benchmarkGerenteModel.js");

// declara a função `estadoFiliais` do arquivo `benchmarkGerenteController.js`:
function estadoFiliais(req, res) {
  // define as variáveis populadas:
  const funcionarioAutenticado = req.body.funcionarioAutenticado;
  // caso o cargo do funcionário seja "gerente":
  if (funcionarioAutenticado.cargo === "gerente") {
    // envia para a função `estadoFiliais` do arquivo `benchmarkGerenteModel.js`:
    benchmarkGerenteModel
      .estadoFiliais(funcionarioAutenticado.fk_empresa)
      .then(function (resultado) {
        // retorna a resposta com status 200 (sucesso) em json contendo as filiais da empresa do usuário autenticado:
        res.status(200).json(resultado);
      })
      // em caso de erro no servidor:
      .catch(function (erro) {
        console.log("Erro no servidor:", erro);
        // retorna o erro com o status 500 (erro de servidor):
        res.status(500).json({ erro: erro.sqlMessage });
      });
  } else {
    res.status(403).json({ erro: "Acesso negado" }); // retorna a resposta com status 403 (Proibido) para o cliente da requisição
  }
}

// exporta as funções do arquivo `benchmarkGerenteController.js`:
module.exports = {
  estadoFiliais,
};
