// benchmarkGerente.js:
// elementos globais:
const filtros = {
  filial1: {
    filial: document.querySelector("main > header > search > div.filial1 select.filial"),
  },
  filial2: {
    filial: document.querySelector("main > header > search > div.filial2 select.filial"),
  },
};

const telas = document.querySelectorAll("main > section.dashboard");
const graficos = document.querySelectorAll("div.grafico:has(> canvas)");
const indicadores = document.querySelectorAll("section.indicador");

let charts = [];
let updateMetricasInterval;

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

// createDOMElement():
function createDOMElement(element, parent) {
  if (arguments.length < 2) throw "Too few arguments";
  if (!("tagName" in element)) throw "No `tagName` specified";
  if (typeof element.tagName != "string") throw "`tagName` is not a string";

  const htmlElement = document.createElement(element.tagName);
  if ("style" in element) {
    if (element.style === null || typeof element.style != "object") throw "`style` is not an object";
    for (const [k, v] of Object.entries(element.style)) htmlElement.style[k] = v;
  }
  if (element.children) {
    if (!Array.isArray(element.children)) throw "`children` is not an array";
    for (const child of element.children) createDOMElement(child, htmlElement);
  }

  for (const [k, v] of Object.entries(element)) {
    switch (k) {
      case "tagName":
      case "style":
      case "children":
        continue;
      default:
        if (k.startsWith("on")) htmlElement.addEventListener(k.substring(2), v);
        else htmlElement[k] = v;
    }
  }
  return parent.appendChild(htmlElement);
}
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
          throw new Error(`Sem filiais na empresa.`);
        }
      });
      div.querySelector("span").textContent = Math.round(dados[0].taxa_geral * 100) + "%";
    } else if (indicador.classList.contains("totens-total")) {
      const dados = await puxarDados("/benchmarkGerente/totensPorEmpresa", {}, (response) => {
        if (response.status == 204) {
          throw new Error(`Sem filiais na empresa.`);
        }
      });
      div.querySelector("span").textContent = dados[0].quantidade;
    } else if (indicador.classList.contains("maior-taxa")) {
      const dados = await puxarDados("/benchmarkGerente/maiorTaxaDeAlertas", {}, (response) => {
        if (response.status == 204) {
          throw new Error(`Sem filiais na empresa.`);
        }
      });
      div.querySelector("h3").textContent = dados[0].nome;
      div.querySelector("span").textContent = Math.round(dados[0].taxa_alerta * 100) + "%";
    } else if (indicador.classList.contains("filiais-total")) {
      const dados = await puxarDados("/benchmarkGerente/totalDeFiliais", {}, (response) => {
        if (response.status == 204) {
          throw new Error(`Sem filiais na empresa.`);
        }
      });
      div.querySelector("span").textContent = dados[0].quantidade;
    }
    if (
      Array.from(telas)
        .find((tela) => tela.classList.contains("filtro-filiais"))
        .classList.contains("ativa")
    ) {
      const totens1 = await puxarDados(
        "/benchmarkGerente/totensPorFilial",
        {
          fk_filial: filtros.filial1.filial.value,
        },
        (response) => {
          if (response.status == 204) {
            throw new Error(`Sem filiais na empresa.`);
          }
        }
      );
      const totens2 = await puxarDados(
        "/benchmarkGerente/totensPorFilial",
        {
          fk_filial: filtros.filial2.filial.value,
        },
        (response) => {
          if (response.status == 204) {
            throw new Error(`Sem filiais na empresa.`);
          }
        }
      );
      const totensEmAlerta1 = await puxarDados(
        "/benchmarkGerente/totensEmAlertaPorFilial",
        {
          fk_filial: filtros.filial1.filial.value,
        },
        (response) => {
          if (response.status == 204) {
            throw new Error(`Sem filiais na empresa.`);
          }
        }
      );
      const totensEmAlerta2 = await puxarDados(
        "/benchmarkGerente/totensEmAlertaPorFilial",
        {
          fk_filial: filtros.filial2.filial.value,
        },
        (response) => {
          if (response.status == 204) {
            throw new Error(`Sem filiais na empresa.`);
          }
        }
      );

      if (indicador.classList.contains("titulos")) {
        indicador.querySelector("div > .filial1").textContent = totens1[0].nome;
        indicador.querySelector("div > .filial2").textContent = totens2[0].nome;
      } else if (indicador.classList.contains("taxas")) {
        indicador.querySelector("div > .filial1").textContent = (totensEmAlerta1[0].totens_alerta / totens1[0].quantidade_totens) || 0 + "%";
        indicador.querySelector("div > .filial2").textContent = (totensEmAlerta2[0].totens_alerta / totens2[0].quantidade_totens) || 0 + "%";
      } else if (indicador.classList.contains("totens")) {
        indicador.querySelector("div > .filial1").textContent = totens1[0].quantidade_totens;
        indicador.querySelector("div > .filial2").textContent = totens2[0].quantidade_totens;
      } else if (indicador.classList.contains("totens-alerta")) {
        indicador.querySelector("div > .filial1").textContent = totensEmAlerta1[0].totens_alerta;
        indicador.querySelector("div > .filial2").textContent = totensEmAlerta2[0].totens_alerta;
      }
    }
  });
}
async function gerarGraficos() {
  return Array.from(graficos).reduce(async (chartList, divGrafico) => {
    if (divGrafico.classList.contains("estado-filiais")) {
      const dados = await puxarDados("/benchmarkGerente/estadoFiliais", {}, (response) => {
        if (response.status == 204) {
          throw new Error(`Sem filiais na empresa.`);
        }
      });

      const config = {
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

      (await chartList)["estadoFiliais"] = new Chart(divGrafico.querySelector("canvas"), config);
    } else if (divGrafico.classList.contains("taxa-alerta")) {
      const dados = await puxarDados("/benchmarkGerente/maioresTaxasDeAlerta", {}, (response) => {
        if (response.status == 204) {
          throw new Error(`Sem filiais na empresa.`);
        }
      });

      const config = {
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
                  relativeSize: "7ar",
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

      (await chartList)["taxaAlerta"] = new Chart(divGrafico.querySelector("canvas"), config);
    }

    if (
      Array.from(telas)
        .find((tela) => tela.classList.contains("filtro-filiais"))
        .classList.contains("ativa") &&
      divGrafico.classList.contains("comparacao-filial-taxas")
    ) {
      const filial1 = await puxarDados(
        "/benchmarkGerente/taxasDaSemanaPorFilial",
        {
          fk_filial: filtros.filial1.filial.value,
        },
        (response) => {
          if (response.status == 204) {
            throw new Error(`Sem filiais na empresa.`);
          }
        }
      );
      const filial2 = await puxarDados(
        "/benchmarkGerente/taxasDaSemanaPorFilial",
        {
          fk_filial: filtros.filial2.filial.value,
        },
        (response) => {
          if (response.status == 204) {
            throw new Error(`Sem filiais na empresa.`);
          }
        }
      );

      console.log(filial1)
      console.log(filial2)

      const config = {
        type: "bar",
        data: {
          labels: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
          datasets: [
            {
              label: filial1[0].nome,
              data: filial1.map((v) => Number(v === null ? 0 : v.taxa_alerta) * 100),
              backgroundColor: "#ff914dff",
            },
            {
              label: filial2[0].nome,
              data: filial2.map((v) => Number(v === null ? 0 : v.taxa_alerta) * 100),
              backgroundColor: "#ff3131ff",
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
                text: "Dia",
                color: "#ffffffff",
                font: {
                  weight: "bold",
                  relativeSize: "4ph",
                  family: '"Abel", sans-serif',
                },
              },
              ticks: {
                color: "#ffffffff",
                font: {
                  weight: "normal",
                  relativeSize: "4ph",
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
                  relativeSize: "4ph",
                  family: '"Abel", sans-serif',
                },
              },
              ticks: {
                color: "#ffffffff",
                beginAtZero: true,
                font: {
                  weight: "normal",
                  relativeSize: "4ph",
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
                relativeSize: "7ph",
                family: '"Abel", sans-serif',
              },
              color: "#ffffffff",
              text: "Taxas de alerta da última semana",
            },
            legend: {
              labels: {
                font: {
                  relativeSize: "5ph",
                  family: '"Abel", sans-serif',
                },
                color: "#ffffffff",
              },
            },
          },
        },
      };

      (await chartList)["comparacaoFilialTaxas"] = new Chart(divGrafico.querySelector("canvas"), config);
    }

    return await chartList;
  }, {});
}
async function gerarTela(classeTela) {
  if (arguments.length === 0) return;

  clearInterval(updateMetricasInterval);
  Object.values(charts).forEach((chart) => {
    chart.destroy();
  });

  for (const tela of telas) {
    tela.classList.remove("ativa");
  }
  Array.from(telas)
    .find((tela) => tela.classList.contains(classeTela))
    .classList.add("ativa");

  charts = await gerarGraficos();
  gerarIndicadores();

  updateMetricasInterval = setInterval(() => {
    Object.values(charts).forEach((chart) => chart.update());
    gerarIndicadores();
  }, 1000);
}
async function verificarFiltros() {
  filtros.filial1.filial.classList.remove("required");
  filtros.filial2.filial.classList.remove("required");
  filtros.filial1.filial.classList.remove("force-required");
  filtros.filial2.filial.classList.remove("force-required");
  if (!filtros.filial1.filial.value && !filtros.filial2.filial.value) {
    await gerarTela("sem-filtro");
  } else if (filtros.filial1.filial.value === filtros.filial2.filial.value) {
    filtros.filial1.filial.classList.add("force-required");
    filtros.filial2.filial.classList.add("force-required");
  } else if (filtros.filial1.filial.value && filtros.filial2.filial.value) {
    await gerarTela("filtro-filiais");
  } else {
    filtros.filial1.filial.classList.add("required");
    filtros.filial2.filial.classList.add("required");
  }
}
async function carregarBody(event) {
  handleSelectsNone(document.querySelectorAll("select"));
  document.querySelectorAll("main > header > search select").forEach(async (select) => {
    const filiais = await puxarDados("/filial/listar", {}, (resposta) => {
      if (resposta.status == 204) {
        throw new Error(`Sem filiais na empresa.`);
      }
    });

    for (const filial of filiais) {
      const newOption = document.createElement("option");
      newOption.value = filial.filialId;
      newOption.textContent = filial.nome;

      select.appendChild(newOption);
    }
    select.addEventListener("change", async (event) => {
      await verificarFiltros();
    });
  });
  await verificarFiltros();
}
// eventos:
addEventListener("load", carregarBody);
