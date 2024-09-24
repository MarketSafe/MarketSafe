// maquinaController.js:

// dependências:
//   importação do arquivo `maquinaModel.js`:
const maquinaModel = require("../models/maquinaModel.js");
//   importação do arquivo `funcionarioModel.js`:
const funcionarioModel = require("../models/funcionarioModel.js");

// declaração da função `cadastrar` do arquivo `maquinaController.js`:
function cadastrar(req, res) {
  // declaração das variáveis recebidas:
  const emailAutenticacao = req.body.emailAutenticacao;
  const senhaAutenticacao = req.body.senhaAutenticacao;
  const hostname = req.body.hostname;

  // validação das variáveis recebidas:
  if (emailAutenticacao === undefined) {
    res.status(400).json({ erro: "`emailAutenticacao` undefined" });
  } else if (senhaAutenticacao === undefined) {
    res.status(400).json({ erro: "`senhaAutenticacao` undefined" });
  } else if (hostname === undefined) {
    res.status(400).json({ erro: "`hostname` undefined" });
  } else {
    // envia para a função `autenticar` do arquivo `funcionarioModel.js`:
    funcionarioModel
      .autenticar(emailAutenticacao, senhaAutenticacao)
      .then(function (resultado) {
        // caso a quantidade de registros encontrados seja igual a 1, o usuário está autenticado:
        if (resultado.length === 1) {
          const funcionarioAutenticado = resultado[0]; // recebe o primeiro (e único) registro do select
          // envia para a função `cadastrar` do arquivo `maquinaModel.js`:
          maquinaModel
            .cadastrar(hostname, funcionarioAutenticado.fk_empresa)
            .then(function (resultado) {
              // retorna a resposta com status 200 (sucesso) em json contendo o id do novo usuário cadastrado:
              res.status(200).json({
                id: resultado.insertId,
              });
            })
            // em caso de erro no servidor:
            .catch(function (erro) {
              console.log("Erro no servidor:", erro);
              // retorna o erro com o status 500 (erro de servidor):
              res.status(500).json({ erro: erro.sqlMessage });
            });
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

// declaração da função `listar` do arquivo `maquinaController.js`:
function listar(req, res) {
  // declaração das variáveis recebidas:
  const emailAutenticacao = req.body.emailAutenticacao;
  const senhaAutenticacao = req.body.senhaAutenticacao;

  // validação das variáveis recebidas:
  if (emailAutenticacao === undefined) {
    res.status(400).json({ erro: "`emailAutenticacao` undefined" });
  } else if (senhaAutenticacao === undefined) {
    res.status(400).json({ erro: "`senhaAutenticacao` undefined" });
  } else {
    // envia para a função `autenticar` do arquivo `funcionarioModel.js`:
    funcionarioModel
      .autenticar(emailAutenticacao, senhaAutenticacao)
      .then(function (resultado) {
        // caso a quantidade de registros encontrados seja igual a 1, o usuário está autenticado:
        if (resultado.length === 1) {
          const funcionarioAutenticado = resultado[0]; // recebe o primeiro (e único) registro do select
          // envia para a função `listar` do arquivo `maquinaModel.js`:
          maquinaModel
            .listar(funcionarioAutenticado.fk_empresa)
            .then(function (resultado) {
              // retorna a resposta com status 200 (sucesso) em json contendo as máquinas da empresa do usuário autenticado:
              res.status(200).json(resultado);
            })
            // em caso de erro no servidor:
            .catch(function (erro) {
              console.log("Erro no servidor:", erro);
              // retorna o erro com o status 500 (erro de servidor):
              res.status(500).json({ erro: erro.sqlMessage });
            });
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

// exporta as funções do arquivo `maquinaController.js`:
module.exports = {
  cadastrar,
  listar,
};
