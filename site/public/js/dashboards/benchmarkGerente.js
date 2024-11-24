// benchmarkGerente.js:
// elementos globais:
const divGraficos = document.querySelectorAll("div.grafico:has(> canvas)");

// funções:
function handleSelectsNone(selects) {
  for (const select of selects) {
    select.addEventListener("change", (e) => {
      const selectedOptions = Array.from(select.selectedOptions);
      
      if (selectedOptions.length === 1 && selectedOptions[0].value === "") {
        Array.from(select.options).find(option => option.disabled && option.value === "").selected = true
      }
    });
  }
}
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
    let config = {};

    if (divGrafico.classList.contains("estado-filiais")) {
      // const dados = await puxarDados("/benchmarkGerente/estadoFiliais", {}, (response) => {
      //   if (response.status == 204) {
      //     throw new Error(`Sem filiais na empresa`);
      //   }
      // });

      config = {
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
                return Math.round((value / context.chart._metasets[context.datasetIndex].total) * 100) + "%";
              },
              font: {
                size: 20,
                family: '"Noto Serif", serif',
              },
              color: "#000000ff",
            },
          },
        },
        plugins: [ChartDataLabels],
      };
    } else if (divGrafico.classList.contains("taxa-alerta")) {
      // const dados = await puxarDados("/benchmarkGerente/estadoFiliais", {}, (response) => {
      //   if (response.status == 204) {
      //     throw new Error(`Sem filiais na empresa`);
      //   }
      // });

      config = {
        type: "bar",
        data: {
          labels: ["Água rasa 2", "Paulista 1", "Lapa", "Paulista 2", "Vila Madalena"],
          datasets: [
            {
              label: "Taxa de totens em alerta",
              data: [100, 100, 75, 60, 50],
              backgroundColor: "#ff914dff",
            },
          ],
        },
        options: {
          responsive: true,
          mantainAspectRatio: false,
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
              text: "5 filiais com maiores taxas de alertas",
            },
            legend: {
              labels: {
                color: "#ffffffff",
              },
            },
            datalabels: {
              formatter: (value, context) => {
                return value + "%";
              },
              font: {
                size: 15,
                family: '"Noto Serif", serif',
              },
              color: "#ffffffff",
              anchor: "end",
              align: "end",
              offset: 5,
            },
          },
        },
        plugins: [ChartDataLabels],
      };
    }

    chartList["taxaAlerta"] = new Chart(divGrafico.querySelector("canvas"), config);

    return chartList;
  }, {});
}
async function carregarBody(event) {
  handleSelectsNone(document.querySelectorAll("select"));
  const charts = await gerarGraficos();
  setInterval(() => Object.values(charts).forEach((chart) => chart.update()), 1000);
}

// eventos:
addEventListener("load", carregarBody);
