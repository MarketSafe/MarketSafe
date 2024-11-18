var database = require("../database/config");

// ----------- CPU do Totem 1 ---------------- //

function Atualizar_ValorT1() {
    console.log("Executando a função Atualizar_ValorT1");

    var instrucaoSql = `
        SELECT cpu_porcentagem as CpuT1
        FROM monitoramento 
        WHERE id = 1
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    return database.executar(instrucaoSql); 
}

// ----------- CPU do Totem 2 ---------------- //

function Atualizar_ValorT2() {
    console.log("Executando a função Atualizar_ValorT2");

    var instrucaoSql = `
        SELECT cpu_porcentagem as CpuT2
        FROM monitoramento 
        WHERE id = 2
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    return database.executar(instrucaoSql); 
}

// ----------- CPU do Totem 3 ---------------- //

function Atualizar_ValorT3() {
    console.log("Executando a função Atualizar_ValorT3");

    var instrucaoSql = `
        SELECT cpu_porcentagem as CpuT3
        FROM monitoramento 
        WHERE id = 3
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    return database.executar(instrucaoSql); 
}

// ----------- CPU do Totem 4 ---------------- //

function Atualizar_ValorT4() {
    console.log("Executando a função Atualizar_ValorT4");

    var instrucaoSql = `
        SELECT cpu_porcentagem as CpuT4
        FROM monitoramento 
        WHERE id = 4
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    return database.executar(instrucaoSql); 
}

// ----------- CPU do Totem 5 ---------------- //

function Atualizar_ValorT5() {
    console.log("Executando a função Atualizar_ValorT5");

    var instrucaoSql = `
        SELECT cpu_porcentagem as CpuT5
        FROM monitoramento 
        WHERE id = 5
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    return database.executar(instrucaoSql); 
}

// ----------- Ram do Totem 1 ---------------- //

function Atualizar_ValorRamT1() {
    console.log("Executando a função Atualizar_ValorRamT1");

    var instrucaoSql = `
        SELECT ram_porcentagem as RamT1
        FROM monitoramento 
        WHERE id = 1
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    return database.executar(instrucaoSql); 
}

// ----------- Ram do Totem 2 ---------------- //

function Atualizar_ValorRamT2() {
    console.log("Executando a função Atualizar_ValorRamT2");

    var instrucaoSql = `
        SELECT ram_porcentagem as RamT2
        FROM monitoramento 
        WHERE id = 2
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    return database.executar(instrucaoSql); 
}

// ----------- Ram do Totem 3 ---------------- //

function Atualizar_ValorRamT3() {
    console.log("Executando a função Atualizar_ValorRamT3");

    var instrucaoSql = `
        SELECT ram_porcentagem as RamT3
        FROM monitoramento 
        WHERE id = 3
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    return database.executar(instrucaoSql); 
}

// ----------- Ram do Totem 4 ---------------- //

function Atualizar_ValorRamT4() {
    console.log("Executando a função Atualizar_ValorRamT4");

    var instrucaoSql = `
        SELECT ram_porcentagem as RamT4
        FROM monitoramento 
        WHERE id = 4
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    return database.executar(instrucaoSql); 
}

// ----------- Ram do Totem 5 ---------------- //

function Atualizar_ValorRamT5() {
    console.log("Executando a função Atualizar_ValorRamT5");

    var instrucaoSql = `
        SELECT ram_porcentagem as RamT5
        FROM monitoramento 
        WHERE id = 5
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    return database.executar(instrucaoSql); 
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
