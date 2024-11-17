var IsaqueModel = require("../models/monitoramentoModelIsaque");

// ----------- CPU do Totem 1 ---------------- //

function Atualizar_ValorT1(req, res) {

    IsaqueModel.Atualizar_ValorT1()
        .then(function (resultado) {
            if (resultado.length > 0) {
     
                res.status(200).json(resultado)
            } else {
     
                res.status(204).send("Nenhum resultado encontrado!");
            }
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao buscar o rank! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

// ----------- CPU do Totem 2 ---------------- //

function Atualizar_ValorT2(req, res) {

    IsaqueModel.Atualizar_ValorT2()
        .then(function (resultado) {
            if (resultado.length > 0) {
     
                res.status(200).json(resultado)
            } else {
     
                res.status(204).send("Nenhum resultado encontrado!");
            }
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao buscar o rank! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

// ----------- CPU do Totem 3 ---------------- //

function Atualizar_ValorT3(req, res) {

    IsaqueModel.Atualizar_ValorT3()
        .then(function (resultado) {
            if (resultado.length > 0) {
     
                res.status(200).json(resultado)
            } else {
     
                res.status(204).send("Nenhum resultado encontrado!");
            }
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao buscar o rank! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

// ----------- CPU do Totem 4 ---------------- //

function Atualizar_ValorT4(req, res) {

    IsaqueModel.Atualizar_ValorT4()
        .then(function (resultado) {
            if (resultado.length > 0) {
     
                res.status(200).json(resultado)
            } else {
     
                res.status(204).send("Nenhum resultado encontrado!");
            }
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao buscar o rank! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

// ----------- CPU do Totem 5 ---------------- //

function Atualizar_ValorT5(req, res) {

    IsaqueModel.Atualizar_ValorT5()
        .then(function (resultado) {
            if (resultado.length > 0) {
     
                res.status(200).json(resultado)
            } else {
     
                res.status(204).send("Nenhum resultado encontrado!");
            }
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao buscar o rank! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

// ----------- Ram do Totem 1 ---------------- //

function Atualizar_ValorRamT1(req, res) {

    IsaqueModel.Atualizar_ValorRamT1()
        .then(function (resultado) {
            if (resultado.length > 0) {
     
                res.status(200).json(resultado)
            } else {
     
                res.status(204).send("Nenhum resultado encontrado!");
            }
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao buscar o rank! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

// ----------- Ram do Totem 2 ---------------- //

function Atualizar_ValorRamT2(req, res) {

    IsaqueModel.Atualizar_ValorRamT2()
        .then(function (resultado) {
            if (resultado.length > 0) {
     
                res.status(200).json(resultado)
            } else {
     
                res.status(204).send("Nenhum resultado encontrado!");
            }
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao buscar o rank! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

// ----------- Ram do Totem 3 ---------------- //

function Atualizar_ValorRamT3(req, res) {

    IsaqueModel.Atualizar_ValorRamT3()
        .then(function (resultado) {
            if (resultado.length > 0) {
     
                res.status(200).json(resultado)
            } else {
     
                res.status(204).send("Nenhum resultado encontrado!");
            }
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao buscar o rank! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

// ----------- Ram do Totem 4 ---------------- //

function Atualizar_ValorRamT4(req, res) {

    IsaqueModel.Atualizar_ValorRamT4()
        .then(function (resultado) {
            if (resultado.length > 0) {
     
                res.status(200).json(resultado)
            } else {
     
                res.status(204).send("Nenhum resultado encontrado!");
            }
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao buscar o rank! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

// ----------- Ram do Totem 5 ---------------- //

function Atualizar_ValorRamT5(req, res) {

    IsaqueModel.Atualizar_ValorRamT5()
        .then(function (resultado) {
            if (resultado.length > 0) {
     
                res.status(200).json(resultado)
            } else {
     
                res.status(204).send("Nenhum resultado encontrado!");
            }
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao buscar o rank! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    Atualizar_ValorT1,
    Atualizar_ValorT2,
    Atualizar_ValorT3,
    Atualizar_ValorT4,
    Atualizar_ValorT5,
    Atualizar_ValorRamT1,
    Atualizar_ValorRamT2,
    Atualizar_ValorRamT3,
    Atualizar_ValorRamT4,
    Atualizar_ValorRamT5
};
