from uuid import getnode
import json
import psutil
from datetime import datetime 
from atlassian import Jira
from requests import HTTPError
import psutil
import boto3
import time 


def abrirChamado(macAddress, cpu, ram):
  componentes = []

  if cpu != None:
    componentes.append("CPU")
  if ram != None:
    componentes.append("RAM")

  jira = Jira(
      url = "",
      username = "",
      password = ""
  )

  try:
    jira.issue_create(
      fields = {
        'project': {
          'key': 'SUP'
        },
        'summary': 'Alerta: Alta utilização de ' + " e ".join(componentes),
        'description': 'O dispositivo com MAC mac_address está com alto uso de CPU: cpu_porcentagem',
        'issuetype': {
          "name": "Task"
        },
      }
    )
  except HTTPError as e:
    print(e.response.text)

accessKeyId = input("Insira o id da sua chave de acesso: ")
secretAccessKey = input("Insira a sua chave de acesso secreta: ")
sessionToken = input("Insira o seu token de sessão: ")

prints = ""
while True:
  prints = input("Deseja exibir prints da execução ? (s/n; default: n): ")
  if prints == "": prints = "n"
  if prints in ["s", "n"]:
    break
  print("Inválido, tente novamente")

if prints == "s": print("Monitoramento iniciado.")

macAddress = hex(getnode())[2:]

contagem = 0

while True:
  dados = []
  
  for i in range(10):
    cpuPorcentagem = psutil.cpu_percent()
    ramPorcentagem = psutil.virtual_memory().percent
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S") 
    dados.append({
      "mac_address": macAddress,
      "cpu_porcentagem": cpuPorcentagem,
      "ram_porcentagem": ramPorcentagem,
      "data_hora": timestamp  
    })
    
    if prints == "s": print(f"{i + 1} dado(s) lido(s)...")

    if (cpuPorcentagem > 85 or ramPorcentagem > 85):
      cpu = None
      ram = None
      if(cpuPorcentagem > 85):
        cpu = cpuPorcentagem
      if(ramPorcentagem > 85):
        ram = ramPorcentagem
      abrirChamado(macAddress, cpu, ram)


    time.sleep(1)

  jsonName = "registro." + str(contagem) + "." + hex(getnode())[2:] + ".json"

  with open(jsonName, "w") as jsonfile:
    json.dump(dados, jsonfile, indent=4) 
  
  s3 = boto3.client(
    service_name = "s3",
    region_name = "us-east-1",
    aws_access_key_id = accessKeyId,
    aws_secret_access_key = secretAccessKey,
    aws_session_token = sessionToken
  )
  s3.upload_file("registro.json", "s3-raw-mkts", jsonName)
  
  if (prints == "s"): print("\"" + jsonName + "\" enviado !")
  
  contagem += 1

