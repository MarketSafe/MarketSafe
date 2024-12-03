// benchmarkGerenteController.js:

// dependências:
//   importa o arquivo `benchmarkGerenteModel.js`:
const benchmarkGerenteModel = require("../../models/dashboards/benchmarkGerenteModel.js");

async function tryResposta(res, func) {
  try {
    // executa a função passada pela variável `func` com os `parametros` recebidos:
    const resposta = await func();
    try {
      // caso o res não tenha sido enviado:
      return res.status(200).end();
    } catch (err) {
      // caso o res já tenha sido enviado:
      return resposta;
    }
  } catch (erro) {
    // em caso de erro na `func`
    console.log("Erro no servidor:", erro);
    try {
      // caso o res não tenha sido enviado:
      return res.status(500).json({ erro }); // status 500 (Erro de servidor)
    } catch (err) {
      // caso o res já tenha sido enviado:
      return erro;
    }
  }
}

// declara a função `authGerente` para autenticar se o usuário é um gerente:
async function authGerente(req, res, next) {
  // caso o cargo do funcionário seja "gerente":
  if (req.body.funcionarioAutenticado.cargo === "gerente") {
    // executa e retorna a função passada pela variável `next`:
    return await next();
  }

  // retorna "Acesso negado." para o para o cliente da requisição:
  res.status(403).json({ erro: "Acesso negado." }); // status 403 (Proibido)
  throw new Error("Acesso negado."); // para a execução das demais funções
}

// declara a função `getFromModel` para retornar um resultado de um model:
async function getFromModel(res, func, parametros) {
  try {
    // executa a função passada pela variável `func` com os `parametros` recebidos:
    return await func(...parametros);
  } catch (erro) {
    // retorna o erro:
    res.status(500).json({ erro: "Erro ao pegar dados do banco de dados." }); // status 500 (Erro de servidor)
    throw erro; // para a execução das demais funções
  }
}

// declara a função `sendRespostaFromModel` para enviar o resultado para o client:
async function sendRespostaFromModel(req, res, func, parametros) {
  tryResposta(res, async () => {
    return await authGerente(req, res, async () => {
      // chama a função `getFromModel` com os parâmetros recebidos:
      const resultado = await getFromModel(res, func, parametros);
      // retorna o resultado para o para o cliente da requisição:
      return res.status(200).json(resultado);
    });
  });
}

// declara a função `estadoFiliais`:
async function estadoFiliais(req, res) {
  return await sendRespostaFromModel(
    req,
    res,
    benchmarkGerenteModel.estadoFiliais,
    [req.body.funcionarioAutenticado.fk_empresa]
  );
}

// declara a função `maioresTaxasDeAlerta`:
async function maioresTaxasDeAlerta(req, res) {
  return await sendRespostaFromModel(
    req,
    res,
    benchmarkGerenteModel.maioresTaxasDeAlerta,
    [req.body.funcionarioAutenticado.fk_empresa]
  );
}

async function taxaGeralDeAlertas(req, res) {
  return await sendRespostaFromModel(
    req,
    res,
    benchmarkGerenteModel.taxaGeralDeAlertas,
    [req.body.funcionarioAutenticado.fk_empresa]
  );
}
async function totensPorEmpresa(req, res) {
  return await sendRespostaFromModel(
    req,
    res,
    benchmarkGerenteModel.totensPorEmpresa,
    [req.body.funcionarioAutenticado.fk_empresa]
  );
}
async function maiorTaxaDeAlertas(req, res) {
  return await sendRespostaFromModel(
    req,
    res,
    benchmarkGerenteModel.maiorTaxaDeAlertas,
    [req.body.funcionarioAutenticado.fk_empresa]
  );
}
async function totalDeFiliais(req, res) {
  return await sendRespostaFromModel(
    req,
    res,
    benchmarkGerenteModel.totalDeFiliais,
    [req.body.funcionarioAutenticado.fk_empresa]
  );
}
async function promocoesPorFilial(req, res) {
  if (!("fk_filial" in req.body)) {
    return res.status(400).json({
      erro: "`fk_filial` undefined.",
    });
  }
  return await sendRespostaFromModel(
    req,
    res,
    benchmarkGerenteModel.promocoesPorFilial,
    [req.body.fk_filial]
  );
}
async function taxasDaSemanaPorFilial(req, res) {
  if (!("fk_filial" in req.body)) {
    return res.status(400).json({
      erro: "`fk_filial` undefined.",
    });
  }
  return await sendRespostaFromModel(
    req,
    res,
    benchmarkGerenteModel.taxasDaSemanaPorFilial,
    [req.body.fk_filial]
  );
}

// exporta as funções do arquivo `benchmarkGerenteController.js`:
module.exports = {
  estadoFiliais,
  maioresTaxasDeAlerta,
  taxaGeralDeAlertas,
  totensPorEmpresa,
  maiorTaxaDeAlertas,
  totalDeFiliais,
  promocoesPorFilial,
  taxasDaSemanaPorFilial,
};
