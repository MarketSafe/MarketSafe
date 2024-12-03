// app.js:

// dependências:
//   importa a framework "express":
const express = require("express");
//   importa o middleware "cors":
const cors = require("cors");
//   importa a biblioteca "path":
const path = require("path");

//   importa as variáveis de ambiente (.env):
// const ambiente_processo = 'producao';
const ambiente_processo = "desenvolvimento";

const caminho_env = ambiente_processo === "producao" ? ".env" : ".env.dev";
require("dotenv").config({ path: caminho_env });

//   importa o arquivo `util.js`:
const util = require("./util/util.js");

const PORTA_APP = process.env.APP_PORT;
const HOST_APP = process.env.APP_HOST;

//   importa as rotas:
const funcionarioRouter = require("./src/routers/funcionarioRouter.js");
const filialRouter = require("./src/routers/filialRouter.js");
const totemRouter = require("./src/routers/totemRouter.js");
const alertaRouter = require("./src/routers/alertaRouter.js");
const rankingRouter = require("./src/routers/rankingRouter.js");
const historicoLeoRouter = require("./src/routers/historicoLeo.js");
const monitoramentoRouterIsaque = require("./src/routers/monitoramentoRouterIsaque.js");
const benchmarkGerenteRouter = require("./src/routers/dashboards/benchmarkGerenteRouter.js");
const previsaoGerenteRouter = require("./src/routers/dashboards/previsaoGerenteRouter.js");
const getS3ObjectsRouter = require('./src/routers/objectLister.js');
// declara a variável de aplicação:
const app = express();

//   define as configurações:
app.use(cors());
app.use(express.json());

//   define as configurações de rotas:
const promocaoRouter = require("./src/routers/promocaoRouter.js");

// Define as configurações de rotas:
app.use("/funcionario", funcionarioRouter);
app.use("/filial", filialRouter);
app.use("/totem", totemRouter);
app.use("/alerta", alertaRouter);
app.use("/ranking", util.auth, rankingRouter);
app.use("/historicoLeo", historicoLeoRouter);
app.use("/monitoramento", monitoramentoRouterIsaque);
app.use("/benchmarkGerente", util.auth, benchmarkGerenteRouter);
app.use("/previsaoGerenteRouter", util.auth, previsaoGerenteRouter);
app.use("/s3", getS3ObjectsRouter);
app.use("/promocao", util.auth, promocaoRouter); 

//   configura arquivos estáticos (*.html, *.css, *.js):
app.use(express.static(path.join(__dirname, "public")));

//   inícia a aplicação:
app.listen(PORTA_APP, function () {
  console.log(`Servidor rodando em http://127.0.0.1:${PORTA_APP}`);
});
