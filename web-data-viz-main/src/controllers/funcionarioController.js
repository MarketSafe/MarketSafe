// funcionarioController.js:

// dependências:
//   importação do arquivo `funcionarioModel.js`:
const funcionarioModel = require("../models/funcionarioModel.js");

// declaração da função `autenticar` do arquivo `funcionarioController.js`:
function autenticar(req, res) {
  // declaração das variáveis recebidas:
  const email = req.body.email;
  const senha = req.body.senha;

  // validação das variáveis recebidas:
  if (email === undefined) {
    res.status(400).json({ erro: "`email` undefined" });
  } else if (senha === undefined) {
    res.status(400).json({ erro: "`senha` undefined" });
  } else {
    // envia para a função `autenticar` do arquivo `funcionarioModel.js`:
    funcionarioModel
      .autenticar(email, senha)
      .then(function (resultado) {
        // caso a quantidade de registros encontrados seja igual a 1, o usuário está autenticado:
        if (resultado.length === 1) {
          const funcionario = resultado[0]; // recebe o primeiro (e único) registro do select
          // retorna a resposta com status 200 (sucesso) em json contendo os dados do usuário autenticado:
          res.status(200).json({
            id: funcionario.id,
            nome: funcionario.nome,
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

// declaração da função `cadastrar` do arquivo `funcionarioController.js`:
function cadastrar(req, res) {
  // declaração das variáveis recebidas:
  const emailAutenticacao = req.body.emailAutenticacao;
  const senhaAutenticacao = req.body.senhaAutenticacao;
  const nome = req.body.nome;
  const cpf = req.body.cpf;
  const cargo = req.body.cargo;
  const email = req.body.email;
  const senha = req.body.senha;
  const telefone = req.body.telefone;

  // validação das variáveis recebidas:
  if (emailAutenticacao === undefined) {
    res.status(400).json({ erro: "`emailAutenticacao` undefined" });
  } else if (senhaAutenticacao === undefined) {
    res.status(400).json({ erro: "`senhaAutenticacao` undefined" });
  } else if (nome === undefined) {
    res.status(400).json({ erro: "`nome` undefined" });
  } else if (cpf === undefined) {
    res.status(400).json({ erro: "`cpf` undefined" });
  } else if (cargo === undefined) {
    res.status(400).json({ erro: "`cargo` undefined" });
  } else if (email === undefined) {
    res.status(400).json({ erro: "`email` undefined" });
  } else if (senha === undefined) {
    res.status(400).json({ erro: "`senha` undefined" });
  } else if (telefone === undefined) {
    res.status(400).json({ erro: "`telefone` undefined" });
  } else {
    // envia para a função `autenticar` do arquivo `funcionarioModel.js`:
    funcionarioModel
      .autenticar(emailAutenticacao, senhaAutenticacao)
      .then(function (resultado) {
        // caso a quantidade de registros encontrados seja igual a 1, o usuário está autenticado:
        if (resultado.length === 1) {
          const funcionarioAutenticado = resultado[0]; // recebe o primeiro (e único) registro do select
          // envia para a função `cadastrar` do arquivo `funcionarioModel.js`:
          funcionarioModel
            .cadastrar(nome, cpf, cargo, email, senha, telefone, funcionarioAutenticado.fk_empresa)
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

// exporta as funções do arquivo `funcionarioController.js`:
module.exports = {
  autenticar,
  cadastrar,
};
