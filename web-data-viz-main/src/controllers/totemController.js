// totemController.js:

// dependências:
//   importação do arquivo `totemModel.js`:
const totemModel = require("../models/totemModel.js");
//   importação do arquivo `funcionarioModel.js`:
const funcionarioModel = require("../models/funcionarioModel.js");

// declaração da função `cadastrar` do arquivo `totemController.js`:
function cadastrar(req, res) {
  // declaração das variáveis recebidas:
  const emailAutenticacao = req.body.emailAutenticacao;
  const senhaAutenticacao = req.body.senhaAutenticacao;
  const mac_address = req.body.mac_address;
  const fk_filial = req.body.fk_filial;

  // validação das variáveis recebidas:
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

          // valida o mac address recebido:
          if (mac_address === undefined) {
            res.status(400).json({ erro: "`mac_address` undefined" });
          } else {
            // caso o cargo do funcionário seja "analista":
            if (funcionarioAutenticado.cargo === "analista") {
              // envia para a função `cadastrar` do arquivo `totemModel.js`:
              totemModel
                .cadastrar(mac_address, funcionarioAutenticado.fk_filial)
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
              if ("fk_filial" === undefined) {
                res.status(400).json({ erro: "`fk_filial` undefined" });
              } else {
                // envia para a função `cadastrar` do arquivo `totemModel.js`:
                totemModel
                  .cadastrar(mac_address, fk_filial)
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
              }
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

// declaração da função `listarPorFilial` do arquivo `totemController.js`:
function listarPorFilial(req, res) {
  // declaração das variáveis recebidas:
  const emailAutenticacao = req.body.emailAutenticacao;
  const senhaAutenticacao = req.body.senhaAutenticacao;
  const filial = req.body.filial;

  // validação das variáveis recebidas:
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

          // caso o cargo do funcionário seja "analista":
          if (funcionarioAutenticado.cargo === "analista") {
            // envia para a função `listarPorFilial` do arquivo `totemModel.js`:
            totemModel
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
              // envia para a função `listarPorFilial` do arquivo `totemModel.js`:
              totemModel
                .listarPorFilial(filial)
                .then(function (resultado) {
                  // retorna a resposta com status 200 (sucesso) em json contendo os totens da filial recebida:
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

// declaração da função `listarPorEmpresa` do arquivo `totemController.js`:
function listarPorEmpresa(req, res) {
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
      .then(function (resultadoAutenticar) {
        // caso a quantidade de registros encontrados seja igual a 1, o usuário está autenticado:
        if (resultadoAutenticar.length === 1) {
          const funcionarioAutenticado = resultadoAutenticar[0]; // recebe o primeiro (e único) registro do select

          // caso o cargo do funcionário seja "gerente":
          if (funcionarioAutenticado.cargo === "gerente") {
            // envia para a função `listarPorEmpresa` do arquivo `totemModel.js`:
            totemModel
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

// exporta as funções do arquivo `totemController.js`:
module.exports = {
  cadastrar,
  listarPorFilial,
  listarPorEmpresa,
};
