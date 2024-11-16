// rankingRouter.js:

// dependências:
//   importa a framework "express":
const express = require("express");

//   importa o arquivo `rankingController.js`:
const rankingController = require("../controllers/rankingController.js");

// declara a variável do roteador:
const router = express.Router();


router.get("/classificacao", function (req, res) {
    rankingController.classificacao(req, res);
}); 

router.get("/buscarPorFilial", function (req, res) {
    rankingController.atualizarTabela(req, res);
});

// exporta a variável de roteador do arquivo `rankingRouter.js`:
module.exports = router;