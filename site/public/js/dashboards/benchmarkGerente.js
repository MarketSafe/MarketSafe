// benchmarkGerente.js:
// elementos globais:
const divGraficos = document.querySelectorAll("div.grafico:has(> canvas)");

// funções:
async function puxarDados(rota, dados, errorCallback) {
  const body = {
    emailAutenticacao: sessionStorage.getItem("EMAIL_USUARIO"),
    senhaAutenticacao: sessionStorage.getItem("SENHA_USUARIO"),
  };

  for (const k in dados) body[k] = dados[k];

  const response = await fetch(rota, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dados),
  });

  if (!response.ok) throw new Error(`Erro ao realizar o fetch: ${response.status} ${response.statusText}`);

  errorCallback(response);

  return response.text();
}
async function gerarGraficos() {
  return Array.from(divGraficos).reduce(async (chartList, divGrafico) => {
    if (divGrafico.classList.contains("estado-filiais")) {
      // const dados = await puxarDados("/benchmarkGerente/estadoFiliais", {}, (response) => {
      //   if (response.status == 204) {
      //     throw new Error(`Sem filiais na empresa`);
      //   }
      // });

      const config = {
        type: "pie",
        data: {
          labels: ["Normal", "Atenção", "Crítico"],
          datasets: [
            {
              data: [15, 8, 3],
              backgroundColor: ["#88bb4eff", "#e9ae30ff", "#ff0000ff"],
              borderColor: "#000000ff",
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              align: "top",
              font: {
                weight: "normal",
                size: 30,
                family: '"Abel", sans-serif',
              },
              color: "#ffffffff",
              text: "Status das filiais",
            },
            legend: {
              position: "right",
              labels: {
                font: {
                  size: 20,
                  family: '"Abel", sans-serif',
                },
                color: "#ffffffff",
              },
            },
            datalabels: {
              formatter: (value, context) => {
                return Math.round((value / context.chart._metasets[context.datasetIndex].total) * 100) + "%" + "\n";
              },
              font: {
                size: 30,
                family: '"Noto Serif", serif',
              },
              color: "#000000ff",
            },
          },
        },
        plugins: [ChartDataLabels],
      };
      
      chartList["estadoFiliais"] = new Chart(divGrafico.querySelector("canvas"), config);
    }
    return chartList;
  }, {});
}
async function carregarBody(event) {
  await gerarGraficos();
}

// eventos:
addEventListener("load", carregarBody);
