// rankingRouter.js:

// dependências:
//   importação da framework "express":
const express = require("express");

//   importação do arquivo `rankingController.js`:
const rankingController = require("../controllers/rankingController.js");

// declaração da variável do roteador:
const router = express.Router();


router.get("/classificacao", function (req, res) {
    rankingController.classificacao(req, res);
}); 


// exporta a variável de roteador do arquivo `rankingRouter.js`:
module.exports = router;