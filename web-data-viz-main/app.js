// dependências:
const express = require("express");
const cors = require("cors");
const path = require("path");

// const ambiente_processo = 'producao';
const ambiente_processo = 'desenvolvimento';

const caminho_env = ambiente_processo === 'producao' ? '.env' : '.env.dev';
require("dotenv").config({ path: caminho_env });
const PORTA_APP = process.env.APP_PORT;
const HOST_APP = process.env.APP_HOST;

// aplicação:
const app = express();

// dependências de rotas:
const indexRouter = require("./src/routers/indexRouter.js");
const usuarioRouter = require("./src/routers/usuarioRouter.js");

// configurações:
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

//   configuração das rotas:
app.use("/", indexRouter);
app.use("/usuario", usuarioRouter);

// aplicação rodando:
app.listen(PORTA_APP, function () {
    console.log(`Servidor rodando em 127.0.0.1:${PORTA_APP}`);
});
