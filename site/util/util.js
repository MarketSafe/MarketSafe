//   importa o arquivo `funcionarioModel.js`:
const funcionarioModel = require("../src/models/funcionarioModel.js");

async function auth(req, res, next) {
  // declara as variáveis recebidas:
  const emailAutenticacao = req.body.emailAutenticacao;
  const senhaAutenticacao = req.body.senhaAutenticacao;

  // valida as variáveis recebidas:
  if (emailAutenticacao === undefined) {
    return res.status(400).json({ erro: "`emailAutenticacao` undefined." });
  } else if (senhaAutenticacao === undefined) {
    return res.status(400).json({ erro: "`senhaAutenticacao` undefined." });
  }

  // envia para a função `autenticar` do arquivo `funcionarioModel.js`:
  const resultadoAutenticar = await funcionarioModel.autenticar(emailAutenticacao, senhaAutenticacao);

  // caso a quantidade de registros encontrados seja igual a 0:
  if (resultadoAutenticar.length === 0) {
    return res.status(401).json({ erro: "Login inválido." }); // retorna a resposta com status 401 (não autorizado) para o cliente da requisição
  }

  req.body.funcionarioAutenticado = resultadoAutenticar[0]; // recebe o primeiro (e único) registro do select
  next();
}

async function authGerente(req, res, next) {
  // declara as variáveis recebidas:
  const funcionarioAutenticado = req.body.funcionarioAutenticado;

  if (funcionarioAutenticado.cargo !== "gerente") {
    return res.status(403).json({ erro: "Acesso negado." });
  }

  next();
}

module.exports = {
  auth,
};
