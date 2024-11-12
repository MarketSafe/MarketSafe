// alertaRouter.js:

// dependências:
//   importação da framework "express":
const express = require("express");

//   importação do arquivo `alertaController.js`:
const rankingController = require("../controllers/rankingController.js");

// declaração da variável do roteador:
const router = express.Router();


router.get("/classificacao", function (req, res) {
    rankingController.classificacao(req, res);
}); 


// exporta a variável de roteador do arquivo `alertaRouter.js`:
module.exports = router;