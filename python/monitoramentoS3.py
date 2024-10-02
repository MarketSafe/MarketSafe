import time
from uuid import getnode
import csv

import psutil
import boto3

accessKeyId = input("Insira o id da sua chave de acesso: ")
secretAccessKey = input("Insira a sua chave de acesso secreta: ")
sessionToken = input("Insira o seu token de sessão: ")

prints = ""
while (True):
  prints = input("Deseja exibir prints da execução ? (s/n; default: n): ")
  if (prints == ""): prints = "n"
  if (prints in ["s", "n"]):
    break
  print("Inválido, tente novamente")

if (prints == "s"): print("Monitoramento iniciado.")

contagem = 0

while (True):
  dados = []
  
  for i in range(10):
    cpuPorcentagem = psutil.cpu_percent()
    ramPorcentagem = psutil.virtual_memory().percent
    dados.append({
      "mac_address": hex(getnode())[2:],
      "cpu_porcentagem": cpuPorcentagem,
      "ram_porcentagem": ramPorcentagem
    })
    
    if (prints == "s"): print(str(i + 1) + " dado(s) lido(s)...")
    time.sleep(1)

  csvName = "registro." + str(contagem) + "." + hex(getnode())[2:] + ".csv"
  
  with open("registro0.csv", "w", newline="") as csvfile:
    writer = csv.DictWriter(csvfile, fieldnames = ["mac_address", "cpu_porcentagem", "ram_porcentagem"])
    writer.writeheader()
    writer.writerows(dados)
  
  s3 = boto3.client(service_name = "s3", region_name = "us-east-1", aws_access_key_id = accessKeyId, aws_secret_access_key = secretAccessKey, aws_session_token = sessionToken)
  
  s3.upload_file("registro.csv", "s3-raw-mkts", csvName)
  
  if (prints == "s"): print("\"" + csvName + "\" enviado !")
  
  contagem += 1
