// filialController.js:

// dependências:
//   importação do arquivo `filialModel.js`:
const filialModel = require("../models/filialModel.js");
//   importação do arquivo `enderecoModel.js`:
const enderecoModel = require("../models/enderecoModel.js");
//   importação do arquivo `funcionarioModel.js`:
const funcionarioModel = require("../models/funcionarioModel.js");

// declaração da função `cadastrar` do arquivo `filialController.js`:
function cadastrar(req, res) {
  // declaração das variáveis recebidas:
  const emailAutenticacao = req.body.emailAutenticacao;
  const senhaAutenticacao = req.body.senhaAutenticacao;
  const cep = req.body.cep;
  const bairro = req.body.bairro;
  const rua = req.body.rua;
  const numero = req.body.numero;
  const complemento = req.body.complemento;

  // validação das variáveis recebidas:
  if (emailAutenticacao === undefined) {
    res.status(400).json({ erro: "`emailAutenticacao` undefined" });
  } else if (senhaAutenticacao === undefined) {
    res.status(400).json({ erro: "`senhaAutenticacao` undefined" });
  } else if (cep === undefined) {
    res.status(400).json({ erro: "`cep` undefined" });
  } else {
    // envia para a função `autenticar` do arquivo `funcionarioModel.js`:
    funcionarioModel
      .autenticar(emailAutenticacao, senhaAutenticacao)
      .then(function (resultadoAutenticar) {
        // caso a quantidade de registros encontrados seja igual a 1, o usuário está autenticado:
        if (resultadoAutenticar.length === 1) {
          const funcionarioAutenticado = resultadoAutenticar[0]; // recebe o primeiro (e único) registro do select

          // envia para a função `cadastrar` do arquivo `enderecoModel.js`:
          enderecoModel
            .cadastrar(cep, bairro, rua, numero, complemento)
            .then(function (resultadoCadastrarEndereco) {
              // declara a variável do id do endereço cadastrado:
              const idEndereco = resultadoCadastrarEndereco.insertId;

              // envia para a função `cadastrar` do arquivo `filialModel.js`:
              filialModel
                .cadastrar(funcionarioAutenticado.fk_empresa, idEndereco)
                .then(function (resultado) {
                  // retorna a resposta com status 200 (sucesso) em json contendo o id da nova filial cadastrada:
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

// declaração da função `listar` do arquivo `filialController.js`:
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
      .then(function (resultadoAutenticar) {
        // caso a quantidade de registros encontrados seja igual a 1, o usuário está autenticado:
        if (resultadoAutenticar.length === 1) {
          const funcionarioAutenticado = resultadoAutenticar[0]; // recebe o primeiro (e único) registro do select
          // envia para a função `listar` do arquivo `filialModel.js`:
          filialModel
            .listar(funcionarioAutenticado.fk_empresa)
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

// exporta as funções do arquivo `filialController.js`:
module.exports = {
  cadastrar,
  listar,
};
