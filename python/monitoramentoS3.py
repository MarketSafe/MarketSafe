import os
from uuid import getnode
import json
import psutil
import datetime
from atlassian import Jira
from requests import HTTPError
import boto3
import time
import mysql.connector

if not os.path.isfile(".env"):
  print("Variáveis de ambiente não configuradas (crie um arquivo \".env\" no mesmo diretório que esta pasta seguindo o exemplo do arquivo \".env.example\").")
else:
  env = dotenv.dotenv_values()

  macAddress = hex(getnode())[2:]
  conn = mysql.connector.connect(
    host=env["DB_HOST"],
    user="mktsUser",
    password="sptech",
    database="market_safe"
  )
  mycursor = conn.cursor()
  mycursor.execute("select id from totem where mac_address = '" + macAddress + "'")
  fkTotem = mycursor.fetchone()

  # Dicionário para armazenar o último alerta gerado para cada MAC
  ultimos_alertas = {}

  def enviarAlerta(componentes, componentesValores):
      jira = Jira(
          url=env["JIRA_URL"],
          username=env["JIRA_USER"],
          password=env["JIRA_PASS"]
      )

      try:
          jira.issue_create(
              fields={
                  "project": {"key": "SUP"},
                  "summary": "Alerta: Alta utilização de " + " e ".join(componentes),
                  "description": f"O totem com o endereço MAC \"{macAddress}\" está com alto uso de {', '.join(componentes)}. Valores: " + "; ".join(componentesValores),
                  "issuetype": {"name": "Task"}
              }
          )
      except HTTPError as e:
          print(e.response.text)

  def gerarAlerta(dataHora, cpu, ram):
      mycursor = conn.cursor()
      mycursor.execute("insert into alerta (data_hora, cpu_porcentagem, ram_porcentagem, fk_totem) values (%s, %s, %s, %s)", 
                      (dataHora, cpu, ram, fkTotem))
      conn.commit()
      mycursor.close()

      componentes = []
      componentesValores = []

      if cpu > 85:
          componentes.append("CPU")
          componentesValores.append(f"CPU: {cpu}")
      if ram > 85:
          componentes.append("RAM")
          componentesValores.append(f"RAM: {ram}")
      
      enviarAlerta(componentes, componentesValores)

  def verificarAlerta(mac, cpuPorcentagem, ramPorcentagem):
      agora = datetime.datetime.now()

      # Se o uso de CPU ou RAM for maior que 85% 
      if cpuPorcentagem > 85 or ramPorcentagem > 85:
          # Verifica se já houve um alerta nos últimos 5 minutos para esse MAC
          if mac not in ultimos_alertas or agora - ultimos_alertas[mac] > datetime.timedelta(minutes=5):
              gerarAlerta(agora.strftime("%Y-%m-%d %H:%M:%S"), cpuPorcentagem, ramPorcentagem)
              ultimos_alertas[mac] = agora  # Atualiza o tempo do último alerta

  if fkTotem is None:
      print(f"Máquina com endereço MAC {macAddress} não cadastrada.")
  else:
      fkTotem = fkTotem[0]

      prints = input("Deseja exibir prints da execução? (s/n; default: n): ")
      if prints == "": prints = "n"

      if prints == "s": print("Monitoramento iniciado.")

      contagem = 0

      while True:
          dados = []

          for i in range(10):
              cpuPorcentagem = psutil.cpu_percent()
              ramPorcentagem = psutil.virtual_memory().percent
              dataHora = datetime.datetime.now()
              dados.append({
                  "dataHora": dataHora.strftime("%Y-%m-%d %H:%M:%S"),
                  "macAddress": macAddress,
                  "cpuPorcentagem": cpuPorcentagem,
                  "ramPorcentagem": ramPorcentagem
              })

              if prints == "s": print(dados[i])

              # Verifica condições para alerta
              verificarAlerta(macAddress, cpuPorcentagem, ramPorcentagem)

              time.sleep(1)

          jsonName = "monitoramento/registro." + dataHora.strftime("%Y-%m-%d.%H-%M-%S") + "." + macAddress + ".json"

          with open("registro.json", "w") as jsonfile:
              json.dump(dados, jsonfile)

          s3 = boto3.client(
              service_name="s3",
              region_name="us-east-1",
              aws_access_key_id=env["AWS_ACCESS_KEY_ID"],
              aws_secret_access_key=env["AWS_SECRET_ACCESS_KEY"],
              aws_session_token=env["AWS_SESSION_TOKEN"]
          )
          s3.upload_file("registro.json", "s3-raw-mktsf", jsonName)

          if prints == "s": print(f"\"{jsonName}\" enviado!")

          contagem += 1
