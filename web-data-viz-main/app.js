// dependências:
//   importação da framework "express":
const express = require("express");
//   importação do middleware "cors":
const cors = require("cors");
//   importação da biblioteca "path":
const path = require("path");

//   importação das variáveis de ambiente (.env):
// const ambiente_processo = 'producao';
const ambiente_processo = "desenvolvimento";

const caminho_env = ambiente_processo === "producao" ? ".env" : ".env.dev";
require("dotenv").config({ path: caminho_env });
const PORTA_APP = process.env.APP_PORT;
const HOST_APP = process.env.APP_HOST;

//   importação das rotas:
const usuarioRouter = require("./src/routers/usuarioRouter.js");

// aplicação:
const app = express();

//   configurações:
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

//   configuração das rotas:
app.use("/usuario", usuarioRouter);

//   início da aplicação:
app.listen(PORTA_APP, function () {
  console.log(`Servidor rodando em http://127.0.0.1:${PORTA_APP}`);
});
