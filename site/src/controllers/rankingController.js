const rankingModel = require('../models/rankingModel');
//   importa o arquivo `funcionarioModel.js`:
const funcionarioModel = require("../models/funcionarioModel.js");

function atualizarTabela(req, res) {
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
            // envia para a função `listar` do arquivo `filialModel.js`:

            const limite_linhas = 3;
            const { filial } = req.body;

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

function classificacao(req, res) {
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
            // envia para a função `listar` do arquivo `filialModel.js`:
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
 
module.exports = {
  atualizarTabela,
  classificacao,
};
