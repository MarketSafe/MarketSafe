// benchmarkGerente.js:
// elementos globais:
const filtros = {
  filial1: {
    filial: document.querySelector("main > header > search > div.filial1 select.filial"),
    promocao: document.querySelector("main > header > search > div.filial1 select.promocao"),
  },
  filial2: {
    filial: document.querySelector("main > header > search > div.filial2 select.filial"),
    promocao: document.querySelector("main > header > search > div.filial2 select.promocao"),
  },
};

const telas = document.querySelectorAll("main > section.dashboard");
const graficos = document.querySelectorAll("div.grafico:has(> canvas)");
const indicadores = document.querySelectorAll("section.indicador");

// funções:
String.prototype.splitByIndex = function (index) {
  return [this.substring(0, index), this.substring(index)];
};
Object.prototype.getPropertiesByName = function (propertyName) {
  if (arguments.length < 1) return this;

  const parents = [];

  function rGetPropertiesByName(obj, propertyName) {
    if (parents.includes(obj)) return [];

    parents.push(obj);

    const r = [];

    for (const k in obj) {
      if (k === propertyName) r.push(obj[k]);
      if (obj[k] !== null && typeof obj[k] === "object") {
        r.push(...rGetPropertiesByName(obj[k], propertyName));
      }
    }

    parents.pop();

    return r;
  }

  return rGetPropertiesByName(this, propertyName);
};
Number.prototype.isOrIsBetween = function (min, max) {
  return this >= min && this <= max;
};
String.prototype.isLowerCase = function () {
  return this.toLowerCase() === String(this);
};
String.prototype.capitalize = function () {
  const trimmed = this.trim();
  return trimmed.charAt(0).toLocaleUpperCase() + trimmed.substring(1);
};
function toPx(value, parent) {
  if (typeof value !== "string") return NaN;

  const valueParts = value.splitByIndex(value.search(/[A-Za-z]*$/));

  if (valueParts[1] === "px") return valueParts[0];

  const parentWidth = toPx(getComputedStyle(parent).width, parent);
  const parentHeight = toPx(getComputedStyle(parent).height, parent);

  switch (valueParts[1]) {
    case "rem":
      return valueParts[0] * toPx(getComputedStyle(document.documentElement).fontSize, parent);
    case "pw":
      return valueParts[0] * (parentWidth / 100);
    case "ph":
      return valueParts[0] * (parentHeight / 100);
    case "ar":
      if (parentWidth / parentHeight < 1) {
        return valueParts[0] * (parentWidth / 100);
      } else {
        return valueParts[0] * (parentHeight / 100);
      }
    default:
      return NaN;
  }
}
function updateChart(chart) {
  for (const datalabel of chart.config._config.options.plugins.getPropertiesByName("datalabels")) {
    const pxSize = toPx(datalabel.relativeOffset, chart.canvas);
    if (isNaN(pxSize)) {
      datalabel.offset = 0;
    } else {
      datalabel.offset = pxSize;
    }
  }
  for (const font of chart.config._config.options.getPropertiesByName("font")) {
    const pxSize = toPx(font.relativeSize, chart.canvas);
    if (isNaN(pxSize)) {
      font.size = Chart.defaults.font.size;
    } else {
      font.size = pxSize;
    }
  }
}
function handleSelectsNone(selects) {
  for (const select of selects) {
    select.addEventListener("change", (e) => {
      const selectedOptions = Array.from(select.selectedOptions);

      if (selectedOptions.length === 1 && selectedOptions[0].value === "") {
        Array.from(select.options).find((option) => option.disabled && option.value === "").selected = true;
      }
    });
  }
}
async function puxarDados(
  rota,
  dados,
  errorCallback = (response) => {
    if (response.status == 204) {
      throw new Error(`Sem dados`);
    }
  }
) {
  const body = {
    emailAutenticacao: localStorage.getItem("EMAIL_USUARIO"),
    senhaAutenticacao: localStorage.getItem("SENHA_USUARIO"),
  };

  for (const k in dados) body[k] = dados[k];

  const response = await fetch(rota, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) throw new Error(`Erro ao realizar o fetch: ${response.status} ${response.statusText}: ${await response.text()}`);

  errorCallback(response);

  return response.json();
}
async function gerarIndicadores() {
  Array.from(indicadores).forEach(async (indicador) => {
    const div = indicador.querySelector("div");
    if (indicador.classList.contains("taxa-geral")) {
      const dados = await puxarDados("/benchmarkGerente/taxaGeralDeAlertas", {}, (response) => {
        if (response.status == 204) {
          throw new Error(`Sem filiais na empresa`);
        }
      });
      div.querySelector("span").textContent = Math.round(dados[0].taxa_geral * 100) + "%";
    } else if (indicador.classList.contains("totens-total")) {
      const dados = await puxarDados("/benchmarkGerente/totensPorEmpresa", {}, (response) => {
        if (response.status == 204) {
          throw new Error(`Sem filiais na empresa`);
        }
      });
      div.querySelector("span").textContent = dados[0].quantidade;
    } else if (indicador.classList.contains("maior-taxa")) {
      const dados = await puxarDados("/benchmarkGerente/maiorTaxaDeAlertas", {}, (response) => {
        if (response.status == 204) {
          throw new Error(`Sem filiais na empresa`);
        }
      });
      div.querySelector("h3").textContent = dados[0].nome;
      div.querySelector("span").textContent = Math.round(dados[0].taxa_alerta * 100) + "%";
    } else if (indicador.classList.contains("filiais-total")) {
      const dados = await puxarDados("/benchmarkGerente/totalDeFiliais", {}, (response) => {
        if (response.status == 204) {
          throw new Error(`Sem filiais na empresa`);
        }
      });
      div.querySelector("span").textContent = dados[0].quantidade;
    }
  });
}
async function gerarGraficos() {
  return Array.from(graficos).reduce(async (chartList, divGrafico) => {
    let config = {};

    if (divGrafico.classList.contains("estado-filiais")) {
      const dados = await puxarDados("/benchmarkGerente/estadoFiliais", {}, (response) => {
        if (response.status == 204) {
          throw new Error(`Sem filiais na empresa`);
        }
      });

      config = {
        type: "pie",
        data: {
          labels: dados.map((v) => (v.status === "normal" ? "Normal" : v.status === "critico" ? "Crítico" : "Atenção")),
          datasets: [
            {
              data: dados.map((v) => v.quantidade),
              backgroundColor: ["#88bb4eff", "#e9ae30ff", "#ff0000ff"],
              borderColor: "#000000ff",
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          onResize: updateChart,
          plugins: {
            title: {
              display: true,
              align: "top",
              font: {
                weight: "normal",
                relativeSize: "10ar",
                family: '"Abel", sans-serif',
              },
              color: "#ffffffff",
              text: "Status das filiais",
            },
            legend: {
              position: "right",
              labels: {
                font: {
                  relativeSize: "6ar",
                  family: '"Abel", sans-serif',
                },
                color: "#ffffffff",
              },
            },
            datalabels: {
              formatter: (value, context) => Math.round((value / context.chart._metasets[context.datasetIndex].total) * 100) + "%",
              font: {
                relativeSize: "8ar",
                family: '"Noto Serif", serif',
              },
              color: "#000000ff",
              anchor: "end",
              align: "start",
              relativeOffset: "1ar",
            },
          },
        },
        plugins: [ChartDataLabels],
      };
    } else if (divGrafico.classList.contains("taxa-alerta")) {
      const dados = await puxarDados("/benchmarkGerente/maioresTaxasDeAlerta", {}, (response) => {
        if (response.status == 204) {
          throw new Error(`Sem filiais na empresa`);
        }
      });

      config = {
        type: "bar",
        data: {
          labels: dados.map((v) => v.nome),
          datasets: [
            {
              label: "Taxa de totens em alerta",
              data: dados.map((v) => Number(v.taxa_alerta) * 100),
              backgroundColor: "#ff914dff",
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          onResize: updateChart,
          scales: {
            x: {
              title: {
                display: true,
                text: "Filiais",
                color: "#ffffffff",
                font: {
                  weight: "bold",
                  size: "15ar",
                  family: '"Abel", sans-serif',
                },
              },
              ticks: {
                color: "#ffffffff",
                font: {
                  weight: "normal",
                  relativeSize: "7ar",
                  family: '"Abel", sans-serif',
                },
              },
            },
            y: {
              title: {
                display: true,
                text: "Taxa de totens em alerta",
                color: "#ffffffff",
                font: {
                  weight: "normal",
                  relativeSize: "7ar",
                  family: '"Abel", sans-serif',
                },
              },
              ticks: {
                color: "#ffffffff",
                beginAtZero: true,
                font: {
                  weight: "normal",
                  relativeSize: "7ar",
                  family: '"Abel", sans-serif',
                },
              },
            },
          },
          plugins: {
            title: {
              display: true,
              align: "top",
              font: {
                weight: "normal",
                relativeSize: "10ar",
                family: '"Abel", sans-serif',
              },
              color: "#ffffffff",
              text: "5 filiais com maiores taxas de alertas",
            },
            legend: {
              labels: {
                font: {
                  relativeSize: "6ar",
                  family: '"Abel", sans-serif',
                },
                color: "#ffffffff",
              },
            },
            datalabels: {
              formatter: (value, context) => {
                return value + "%";
              },
              font: {
                relativeSize: "6ar",
                family: '"Noto Serif", serif',
              },
              color: "#ffffffff",
              anchor: "end",
              align: "end",
              relativeOffset: "1ar",
              display: "auto",
            },
            legendMargin: {
              margin: "10ph",
            },
          },
        },
        plugins: [
          ChartDataLabels,
          {
            id: "legendMargin",
            afterInit(chart, args, plugins) {
              const originalFit = chart.legend.fit;
              const margin = toPx(plugins.margin, chart.canvas) || (typeof plugins.margin === "number" ? plugins.margin : 0);

              chart.legend.fit = function fit() {
                if (originalFit) originalFit.call(this);
                return (this.height += margin);
              };
            },
          },
        ],
      };
    }

    chartList["taxaAlerta"] = new Chart(divGrafico.querySelector("canvas"), config);

    return chartList;
  }, {});
}
async function gerarTelaSemFiltro() {
  for (const tela of telas) {
    tela.classList.remove("ativa");
  }
  Array.from(telas).find((tela) => tela.classList.contains("sem-filtro")).classList.add("ativa");
  handleSelectsNone(document.querySelectorAll("select"));
  const charts = await gerarGraficos();
  gerarIndicadores();
  setInterval(() => {
    Object.values(charts).forEach((chart) => chart.update());
    gerarIndicadores();
  }, 1000);
}
async function gerarTelaFiliais() {}
async function verificarFiltros() {
  if (!filtros.filial1.filial.value && !filtros.filial2.filial.value && !filtros.filial1.promocao.value && !filtros.filial2.promocao.value) {
    await gerarTelaSemFiltro();
  }
}
async function carregarFiltros() {
  if (filtros.filial1.filial.value || filtros.filial2.filial.value) {
  } else {
    await verificarFiltros();
  }
}
async function carregarBody(event) {
  await carregarFiltros();
}
// eventos:
addEventListener("load", carregarBody);
