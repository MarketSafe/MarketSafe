// app.js:

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
const funcionarioRouter = require("./src/routers/funcionarioRouter.js");
const filialRouter = require("./src/routers/filialRouter.js");
const totemRouter = require("./src/routers/totemRouter.js");
const alertaRouter = require("./src/routers/alertaRouter.js");
const rankingRouter = require("./src/routers/rankingRouter.js");
const historicoLeoRouter = require("./src/routers/historicoLeo.js");

// declaração da variável de aplicação:
const app = express();

//   definição das configurações:
app.use(cors());
app.use(express.json());

//   definição da configuração de rotas:
app.use("/funcionario", funcionarioRouter);
app.use("/filial", filialRouter);
app.use("/totem", totemRouter);
app.use("/alerta", alertaRouter);
app.use("/ranking", rankingRouter);
app.use("/historicoLeo", historicoLeoRouter);

//   configuração de arquivos estáticos (*.html, *.css, *.js):
app.use(express.static(path.join(__dirname, "public")));

//   início da aplicação:
app.listen(PORTA_APP, function () {
  console.log(`Servidor rodando em http://127.0.0.1:${PORTA_APP}`);
});
