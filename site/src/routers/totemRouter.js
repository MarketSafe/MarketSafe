// totemRouter.js:

// dependências:
//   importa a framework "express":
const express = require("express");

//   importa o arquivo `totemController.js`:
const totemController = require("../controllers/totemController.js");

// declara a variável do roteador:
const router = express.Router();

// envia a requisição do tipo post "/cadastrar" para a função `cadastrar` do `totemController.js`:
router.post("/cadastrar", function (req, res) {
  totemController.cadastrar(req, res);
});

// envia a requisição do tipo post "/listarPorFilial" para a função `listarPorFilial` do `totemController.js`:
router.post("/listarPorFilial", function (req, res) {
  totemController.listarPorFilial(req, res);
});


// envia a requisição do tipo post "/listarAlertaPorTotem" para a função `listarAlertaPorTotem` do `totemController.js`:
router.post("/listarAlertaPorTotem/:totem/:componente/:inicio/:fim", function (req, res) {
  totemController.listarAlertaPorTotem(req, res);
});

router.post("/listarTodosAlertas", function (req, res) {
  totemController.listarTodosAlertas(req, res);
});

router.post("/puxarTodosAlertasPorTotem/:totem1/:totem2/:inicio/:fim", function (req, res) {
  totemController.puxarTodosAlertasPorTotem(req, res);
});

// envia a requisição do tipo post "/listarAlertaPorTotemPorDiaDaSemana" para a função `listarAlertaPorTotem` do `totemController.js`:
router.post("/listarAlertaPorTotemPorDiaDaSemana/:totem/:componente/:inicio/:fim/:hi/:hf", function (req, res) {
  totemController.listarAlertaPorTotemPorDiaDaSemana(req, res);
});

// envia a requisição do tipo post "/listarPorEmpresa" para a função `listarPorEmpresa` do `totemController.js`:
router.post("/listarPorEmpresa", function (req, res) {
  totemController.listarPorEmpresa(req, res);
});

// exporta a variável de roteador do arquivo `totemRouter.js`:
module.exports = router;
