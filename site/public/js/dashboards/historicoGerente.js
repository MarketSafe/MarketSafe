let filiais;

function adicionarPromocao(tabela, posicao, promocao, quantidadeDeAlertas) {
  var linha = document.createElement("tr");
  var lugar = document.createElement("td");
  var desconto = document.createElement("td");
  var qtdAlertas = document.createElement("td");

  lugar.innerHTML = `${posicao}`;
  desconto.textContent = promocao;
  qtdAlertas.textContent = quantidadeDeAlertas;

  linha.appendChild(lugar);
  linha.appendChild(desconto);
  linha.appendChild(qtdAlertas);
  tabela.appendChild(linha);
}

async function buscarPorFilial() {
  // console.log(filiais)
  document.getElementById("filtrar").addEventListener("click", async () => {
    const filial = document.getElementById("filial").value;

    atualizarGrafico();

    document.getElementById("card-performance").style.display = "none";
    document.getElementById("grafico-performance").style.display = "block";
    const response = await fetch(`/ranking/buscarPorFilial`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        emailAutenticacao: sessionStorage.getItem("EMAIL_USUARIO"),
        senhaAutenticacao: sessionStorage.getItem("SENHA_USUARIO"),
        filial,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      if (data) {
        // console.log('Dados recebidos:', data);
        var tabela = document.getElementById("corpoTabela");
        tabela.innerHTML = "";

        for (var i = 0; i < data.length; i++) {
          var item = data[i];
          var nomePromocao = item.promocao;
          var qtdAlertas = item.qtd_alertas;

          adicionarPromocao(tabela, i + 1, nomePromocao, qtdAlertas);
        }
      }
    } else if (response.status === 204) {
      return null;
    } else {
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }
  });
}

async function atualizarTabela() {
  const response = await fetch("/ranking/classificacao", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      emailAutenticacao: sessionStorage.getItem("EMAIL_USUARIO"),
      senhaAutenticacao: sessionStorage.getItem("SENHA_USUARIO"),
    }),
  });
  const data = await response.json();
  var tabela = document.getElementById("corpoTabela");

  tabela.innerHTML = "";

  for (var i = 0; i < Math.min(3, data.length); i++) {
    var item = data[i];
    var nomePromocao = item.promocao;
    var qtdAlertas = item.qtd_alertas;

    adicionarPromocao(tabela, i + 1, nomePromocao, qtdAlertas);
  }
}

async function carregarFiliais(fk_empresa) {
  const response = await fetch(`/filial/listar`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      emailAutenticacao: sessionStorage.getItem("EMAIL_USUARIO"),
      senhaAutenticacao: sessionStorage.getItem("SENHA_USUARIO"),
    }),
  });
  // console.log(response)
  if (!response.ok) {
    throw new Error("Erro ao buscar filiais");
  }

  filiais = await response.json();
  // console.log(filiais);
  const filialSelect = document.getElementById("filial");
  filialSelect.innerHTML = '<option value="">Escolha uma filial</option>';

  for (let i = 0; i < filiais.length; i++) {
    const filial = filiais[i];
    const option = document.createElement("option");
    option.value = filial.filialId;
    option.textContent = filial.nome;
    filialSelect.appendChild(option);
  }
}

async function statusFiliais() {
  try {
    const response = await fetch(`/ranking/statusFiliais`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        emailAutenticacao: sessionStorage.getItem("EMAIL_USUARIO"),
        senhaAutenticacao: sessionStorage.getItem("SENHA_USUARIO"),
      }),
    });
    // console.log(await response)
    if (!response.ok) {
      throw new Error("Erro ao buscar filiais");
    }

    const dados = await response.json();

    const normal = [];
    const atencao = [];
    const critico = [];
    for (const linha of dados) {
      switch (linha.status) {
        case "critico":
          critico.push(linha.nome);

          break;
        case "atencao":
          atencao.push(linha.nome);
          break;
        case "normal":
          normal.push(linha.nome);
          break;
      }
    }

    const cards = document
      .querySelector(".status-container")
      .querySelectorAll(".status-box");

    for (const card of cards) {
      if (card.classList.contains("critico")) {
        card.querySelector(".face.front").innerHTML = critico.join("<br />");
        card.querySelector(".status-numero").innerHTML = critico.length;
      } else if (card.classList.contains("atencao")) {
        card.querySelector(".face.front").innerHTML = atencao.join("<br />");
        card.querySelector(".status-numero").innerHTML = atencao.length;
      } else if (card.classList.contains("normal")) {
        card.querySelector(".face.front").innerHTML = normal.join("<br />");
        card.querySelector(".status-numero").innerHTML = normal.length;
      }
    }

    // [
    //     "a",
    //     "b",
    //     "c",
    // ]
    // for (const x of cards) {
    //     console.log(x);
    // }
    // for (let i = 0; i < cards.length; i++) {
    //     const x = cards[i];
    //     console.log(x);
    // }
  } catch (error) {
    console.log("Erro ao carregar filiais:", error);
  }
}

async function atualizarGrafico(dados) {
  const filial = document.getElementById("filial").value;
  // console.log(filial)
  const response = await fetch("/ranking/alertasMensal", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      emailAutenticacao: sessionStorage.getItem("EMAIL_USUARIO"),
      senhaAutenticacao: sessionStorage.getItem("SENHA_USUARIO"),
      filial,
      mes: document.getElementById("mes").value,
    }),
  });

  if (!response.ok) {
    console.error(`Erro: ${response.statusText}`);
    return;
  } else if (response.status === 204) {
    alert("Não houve nenhum alerta neste mês");
    return;
  }
  // console.log(await response.text())
  const result = await response.json();
  const dias = [0, 1, 2, 3, 4, 5, 6];
  const valores = [0, 0, 0, 0, 0, 0, 0];

  for (let i = 0; i < result.length; i++) {
    const item = result[i];
    valores[item.dia] = item.qtdAlertas;
  }

  // console.log(valores)
  const labels = [
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
    "Domingo",
  ];
  const data = {
    labels: labels,
    datasets: [
      {
        axis: "y",
        label: "Quantidade de Alertas",
        data: valores,
        fill: false,
        backgroundColor: ["rgba(255, 159, 64, 1)"],
        borderColor: ["rgb(255, 159, 64)"],
        borderWidth: 1,
      },
    ],
  };

  const config = {
    type: "bar",
    data: data,
    options: {
      indexAxis: "x",
      responsive: true,
      scales: {
        x: {
          beginAtZero: true,
          ticks: {
            color: "rgba(255, 255, 255, 0.90)",
          },
        },
        y: {
          ticks: {
            color: "rgba(255, 255, 255, 0.90)",
          },
        },
      },
      plugins: {
        legend: {
          labels: {
            color: "white",
          },
        },
        title: {
          display: true,
          align: "top",
          font: {
            weight: "normal",
            size: 30,
            family: '"Abel", sans-serif',
          },
          color: "#ffffffff",
          text: "Alertas Mensais por Dia da Semana",
        },
      },
    },
  };

  const barChart = new Chart(document.getElementById("barChart"), config);
  barChart.update();
}

const pieData = {
  labels: ["Processador", "Memória Ram"],
  datasets: [
    {
      data: [0, 0],
      backgroundColor: ["rgb(155, 17, 30)", "rgb(5, 79, 119)"],
      hoverOffset: 4,
    },
  ],
};

const pieConfig = {
  type: "pie",
  data: pieData,
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: "right",
        labels: {
          font: {
            size: 15,
          },
          color: "rgba(255, 255, 255, 0.90)",
        },
      },

      datalabels: {
        display: false,
        formatter: (value, context) => {
          const total = context.chart._metasets[context.datasetIndex].total;
          const percentage = ((value / total) * 100).toFixed(2);
          return `${percentage}%\n${value}`;
        },
        color: "#000",
        font: {
          size: 18,
        },
      },
    },
  },
  plugins: [ChartDataLabels],
};

const pieChart = new Chart(document.getElementById("pieChart"), pieConfig);

async function atualizarGraficoStatus() {
  const response = await fetch("/ranking/statusFiliaisHistorico", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      emailAutenticacao: sessionStorage.getItem("EMAIL_USUARIO"),
      senhaAutenticacao: sessionStorage.getItem("SENHA_USUARIO"),
      mes: document.getElementById("mes").value,
    }),
  });

  if (!response.ok) {
    console.error("Erro na requisição:", response.statusText);
    return;
  }

  const data = await response.json();

  const labels = ["Semana 1", "Semana 2", "Semana 3", "Semana 4"];

  const datasets = data.map((item) => {
    let backgroundColor;

    if (item.status === "critico") {
      backgroundColor = "#ff4d4d";
    } else if (item.status === "atencao") {
      backgroundColor = "#ffcc00";
    } else {
      backgroundColor = "#99cc66";
    }

    return {
      label: item.status.charAt(0).toUpperCase() + item.status.slice(1),
      data: [item.semana_1, item.semana_2, item.semana_3, item.semana_4],
      backgroundColor: backgroundColor,
    };
  });

  const config = {
    type: "bar",
    data: {
      labels: labels,
      datasets: datasets,
    },
    options: {
      responsive: false,
      scales: {
        x: {
          stacked: true,
          ticks: {
            color: "rgba(255, 255, 255, 0.90)",
          },
        },
        y: {
          stacked: true,
          ticks: {
            color: "rgba(255, 255, 255, 0.90)",
          },
        },
      },
      plugins: {
        legend: {
          labels: {
            color: "white",
          },
        },
      },
    },
  };

  const ctx = document.getElementById("stackedBarChart").getContext("2d");
  new Chart(ctx, config);
}


async function inicializarPagina() {
  await carregarFiliais();
  await atualizarTabela();
  await buscarPorFilial();
  await statusFiliais();
  await atualizarGraficoStatus();
}

addEventListener("load", inicializarPagina);
