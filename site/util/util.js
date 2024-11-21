//   importa o arquivo `funcionarioModel.js`:
const funcionarioModel = require("../src/models/funcionarioModel.js");

function auth(req, res, next) {
  // declara as variáveis recebidas:
  const emailAutenticacao = req.body.emailAutenticacao;
  const senhaAutenticacao = req.body.senhaAutenticacao;

  // valida as variáveis recebidas:
  if (emailAutenticacao === undefined) {
    res.status(400).json({ erro: "`emailAutenticacao` undefined" });
  } else if (senhaAutenticacao === undefined) {
    res.status(400).json({ erro: "`senhaAutenticacao` undefined" });
  } else {
    // envia para a função `autenticar` do arquivo `funcionarioModel.js`:
    funcionarioModel
      .autenticar(emailAutenticacao, senhaAutenticacao)
      .then(function (resultadoAutenticar) {
        // caso a quantidade de registros encontrados seja igual a 1, o usuário está autenticado:
        if (resultadoAutenticar.length === 1) {
          req.body.funcionarioAutenticado = resultadoAutenticar[0]; // recebe o primeiro (e único) registro do select
        } else {
          res.status(401).json({ erro: "Login inválido" }); // retorna a resposta com status 401 (não autorizado) para o cliente da requisição
        }
      })
      // em caso de erro no servidor:
      .catch(function (erro) {
        console.log("Erro no servidor:", erro);
        // retorna o erro com o status 500 (erro de servidor):
        res.status(500).json({ erro: erro.sqlMessage });
      });
  }
}

