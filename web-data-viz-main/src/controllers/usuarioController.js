// dependências:
//   importação do usuarioModel.js:
const usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
  // definição das variáveis recebidas:
  const email = req.body.emailServer;
  const senha = req.body.senhaServer;

  // validação das variáveis recebidas:
  if (email == undefined) {
    res.status(400).json({erro: "`email` undefined"});
  } else if (senha == undefined) {
    res.status(400).json({erro: "`senha` undefined"});
  } else {
    // envia para o usuarioModel.js:
    usuarioModel
      .autenticar(email, senha)
      .then(function (resultado) {
        if (resultado.length == 1) {
          const usuario = resultado[0];
          res.status(200).json({
            idUsuario: usuario.idUsuario,
            email: usuario.email,
            nome: usuario.nome,
            senha: usuario.senha,
          });
        } else {
          res.status(403).json({erro: "Login inválido"});
        }
      })
      .catch(function (erro) {
        console.log("Erro no servidor:", erro);
        res.status(500).json(erro.sqlMessage);
      });
  }
}

function cadastrar(req, res) {
  // definição das variáveis recebidas:
  const email = req.body.emailServer;
  const senha = req.body.senhaServer;

  // validação das variáveis recebidas:
  if (email == undefined) {
    res.status(400).json({erro: "`email` undefined"});
  } else if (senha == undefined) {
    res.status(400).json({erro: "`senha` undefined"});
  } else {
    // envia para o usuarioModel.js:
    usuarioModel
      .cadastrar(email, senha)
      .then(function (resultado) {
          res.status(200).json({
            id: resultado.insertId,
          });
      })
      .catch(function (erro) {
        console.log("Erro no servidor:", erro);
        res.status(500).json(erro.sqlMessage);
      });
  }
}

module.exports = {
  autenticar,
  cadastrar,
};
