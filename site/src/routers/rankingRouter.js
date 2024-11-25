// rankingRouter.js:

// dependências:
//   importa a framework "express":
const express = require("express");

//   importa o arquivo `rankingController.js`:
const rankingController = require("../controllers/rankingController.js");

// declara a variável do roteador:
const router = express.Router();


router.post("/classificacao", function (req, res) {
    rankingController.classificacao(req, res);
}); 

router.post("/buscarPorFilial", function (req, res) {
    rankingController.atualizarTabela(req, res);
});

router.post("/statusFiliais", function (req, res) {
    rankingController.statusFiliais(req, res);
});

router.post("/alertasMensal", function (req, res) {
    rankingController.alertasMensal(req, res);
});

router.post("/statusFiliaisHistorico", function (req, res) {
    rankingController.statusFiliaisHistorico(req, res);
});
// exporta a variável de roteador do arquivo `rankingRouter.js`:
module.exports = router;