const promocaoModel = require("../models/promocaoModel.js");




function cadastrarPromocao(req, res) {
  // Declara as variáveis recebidas
  const nomePromocao = req.body.nomePromocao;
  const fk_filial = req.body.fk_filial;

  // Valida as variáveis recebidas
  if (!nomePromocao) {
    res.status(400).json({ erro: "`nomePromocao` não definido" });
  } else if (!fk_filial) {
    res.status(400).json({ erro: "`fk_filial` não definido" });
  } else {
    // Envia para a função `cadastrarPromocao` no `promocaoModel.js`
    promocaoModel
      .cadastrarPromocao(nomePromocao, fk_filial)
      .then((resultado) => {
        // Retorna o id da nova promoção cadastrada
        res.status(200).json({
          id: resultado.insertId,
          mensagem: "Promoção cadastrada com sucesso!",
        });
      })
      .catch((erro) => {
        console.error("Erro no servidor:", erro);
        res.status(500).json({ erro: erro.sqlMessage });
      });
  }
}

module.exports = { cadastrarPromocao };
