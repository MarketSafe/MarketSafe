const express = require("express");

const router = express.Router();

var IsaqueController = require("../controllers/monitoramentoControllerIsaque");

//------------- CPU do Totem 1 ----------------//

router.post("/AtualizarValorT1", function (req, res) {
    IsaqueController.Atualizar_ValorT1(req, res);
});

//------------- CPU do Totem 2 ----------------//

router.post("/AtualizarValorT2", function (req, res) {
    IsaqueController.Atualizar_ValorT2(req, res);
});

//------------- CPU do Totem 3 ----------------//

router.post("/AtualizarValorT3", function (req, res) {
    IsaqueController.Atualizar_ValorT3(req, res);
});

//------------- CPU do Totem 4 ----------------//

router.post("/AtualizarValorT4", function (req, res) {
    IsaqueController.Atualizar_ValorT4(req, res);
});

//------------- CPU do Totem 5 ----------------//

router.post("/AtualizarValorT5", function (req, res) {
    IsaqueController.Atualizar_ValorT5(req, res);
});

//------------- Ram do Totem 1 ----------------//

router.post("/AtualizarValorRamT1", function (req, res) {
    IsaqueController.Atualizar_ValorRamT1(req, res);
});

//------------- Ram do Totem 2 ----------------//

router.post("/AtualizarValorRamT2", function (req, res) {
    IsaqueController.Atualizar_ValorRamT2(req, res);
});

//------------- Ram do Totem 3 ----------------//

router.post("/AtualizarValorRamT3", function (req, res) {
    IsaqueController.Atualizar_ValorRamT3(req, res);
});

//------------- Ram do Totem 4 ----------------//

router.post("/AtualizarValorRamT4", function (req, res) {
    IsaqueController.Atualizar_ValorRamT4(req, res);
});

//------------- Ram do Totem 5 ----------------//

router.post("/AtualizarValorRamT5", function (req, res) {
    IsaqueController.Atualizar_ValorRamT5(req, res);
});


module.exports = router;