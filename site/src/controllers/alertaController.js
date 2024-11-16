// alertaController.js:

// dependências:
//   importa o arquivo `alertaModel.js`:
const alertaModel = require("../models/alertaModel.js");
//   importa o arquivo `funcionarioModel.js`:
const funcionarioModel = require("../models/funcionarioModel.js");

// declara a função `listarPorFilial` do arquivo `alertaController.js`:
function listarPorFilial(req, res) {
  // declara as variáveis recebidas:
  const emailAutenticacao = req.body.emailAutenticacao;
  const senhaAutenticacao = req.body.senhaAutenticacao;
  const filial = req.bodu.filial;

  // valida as variáveis recebidas:
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

          // caso o cargo do funcionário seja "analista":
          if (funcionarioAutenticado.cargo === "analista") {
            // envia para a função `listarPorFilial` do arquivo `alertaModel.js`:
            alertaModel
              .listarPorFilial(funcionarioAutenticado.fk_filial)
              .then(function (resultado) {
                // retorna a resposta com status 200 (sucesso) em json contendo os totens da filial do usuário autenticado:
                res.status(200).json(resultado);
              })
              // em caso de erro no servidor:
              .catch(function (erro) {
                console.log("Erro no servidor:", erro);
                // retorna o erro com o status 500 (erro de servidor):
                res.status(500).json({ erro: erro.sqlMessage });
              });
          } else {
            // valida a filial recebida:
            if (filial === undefined) {
              res.status(400).json({ erro: "`filial` undefined" });
            } else {
              // envia para a função `listarPorFilial` do arquivo `alertaModel.js`:
              alertaModel
                .listarPorFilial(filial)
                .then(function (resultado) {
                  // retorna a resposta com status 200 (sucesso) em json contendo os totens da filial do usuário autenticado:
                  res.status(200).json(resultado);
                })
                // em caso de erro no servidor:
                .catch(function (erro) {
                  console.log("Erro no servidor:", erro);
                  // retorna o erro com o status 500 (erro de servidor):
                  res.status(500).json({ erro: erro.sqlMessage });
                });
            }
          }
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

// declara a função `listarPorEmpresa` do arquivo `alertaController.js`:
function listarPorEmpresa(req, res) {
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
          const funcionarioAutenticado = resultadoAutenticar[0]; // recebe o primeiro (e único) registro do select
          // caso o cargo do funcionário seja "gerente":
          if (funcionarioAutenticado.cargo === "gerente") {
              // envia para a função `listarPorEmpresa` do arquivo `alertaModel.js`:
              alertaModel
                .listarPorEmpresa(funcionarioAutenticado.fk_empresa)
                .then(function (resultado) {
                  // retorna a resposta com status 200 (sucesso) em json contendo os totens da empresa do usuário autenticado:
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

// exporta as funções do arquivo `alertaController.js`:
module.exports = {
  listarPorFilial,
  listarPorEmpresa,
};
