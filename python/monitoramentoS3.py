from uuid import getnode
import json
import psutil
from datetime import datetime
from atlassian import Jira
from requests import HTTPError
import psutil
import boto3
import time
import mysql.connector

macAddress = hex(getnode())[2:]

conn = mysql.connector.connect(
  host = "127.0.0.1",
  user = "aluno",
  password = "sptech",
  database = "market_safe"
)

mycursor = conn.cursor()
mycursor.execute("select id from totem where mac_address = '" + macAddress + "'")
fkTotem = mycursor.fetchone()

def gerarAlerta(dataHora, cpu, ram):
  mycursor = conn.cursor()
  mycursor.execute("insert into alerta (data_hora, cpu_porcentagem, ram_porcentagem, fk_totem) values (\"" + str(dataHora) + "\", " + str(cpu) + ", " + str(ram) + ", " + str(fkTotem) + ")")
  mycursor = conn.cursor()
  conn.commit()
  mycursor.close()

  componentes = []
  componentesValores = []

  if(cpuPorcentagem > 85):
    componentes.append("CPU")
    componentesValores.append("CPU: " + str(cpu))
  if(ramPorcentagem > 85):
    componentes.append("RAM")
    componentesValores.append("RAM: " + str(ram))

  jira = Jira(
      url = "",
      username = "",
      password = ""
  )

  try:
    jira.issue_create(
      fields = {
        "project": {
          "key": "SUP"
        },
        "summary": "Alerta: Alta utilização de " + " e ".join(componentes),
        "description": "O totem com o endereço MAC \"" + macAddress + "\" está com alto uso de " + " e ".join(componentes) + ". Valores:\n  " + "; ".join(componentesValores),
        "issuetype": {
          "name": "Task"
        },
      }
    )
  except HTTPError as e:
    print(e.response.text)


if (fkTotem == None):
  print("Máquina com endereço MAC " + macAddress + " não cadastrada.")
else:
  fkTotem = fkTotem[0]
  
  accessKeyId = input("Insira seu access_key_id: ")
  secretAccessKey = input("Insira seu secret_access_key: ")
  sessionToken = input("Insira seu session_token: ")

  prints = ""
  while True:
    prints = input("Deseja exibir prints da execução ? (s/n; default: n): ")
    if prints == "": prints = "n"
    if prints in ["s", "n"]:
      break
    print("Inválido, tente novamente")

  if prints == "s": print("Monitoramento iniciado.")

  contagem = 0

  while True:
    dados = []

    for i in range(10):
      cpuPorcentagem = psutil.cpu_percent()
      ramPorcentagem = psutil.virtual_memory().percent
      dataHora = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
      dados.append({
        "data_hora": dataHora,
        "mac_address": macAddress,
        "cpu_porcentagem": cpuPorcentagem,
        "ram_porcentagem": ramPorcentagem
      })

      if prints == "s": print(dados[i])
      if prints == "s": print(f"{i + 1} dado(s) lido(s)...")

      if (cpuPorcentagem > 85 or ramPorcentagem > 85):
        gerarAlerta(dataHora, cpuPorcentagem, ramPorcentagem)

      time.sleep(1)

    jsonName = "monitoramento/registro." + str(contagem) + "." + hex(getnode())[2:] + ".json"

    with open("registro.json", "w") as jsonfile:
      json.dump(dados, jsonfile)

    s3 = boto3.client(
      service_name = "s3",
      region_name = "us-east-1",
      aws_access_key_id = accessKeyId,
      aws_secret_access_key = secretAccessKey,
      aws_session_token = sessionToken
    )
    s3.upload_file("registro.json", "s3-raw-mktsf", jsonName)

    if (prints == "s"): print("\"" + jsonName + "\" enviado !")

    contagem += 1
