import csv
import psutil
from uuid import getnode
import boto3
import time

contagem = 0

while (True):
  data = []
  for _ in range(10):
    cpuPorcentagem = psutil.cpu_percent()
    ramPorcentagem = psutil.virtual_memory().percent
    data.append({"mac_address": hex(getnode())[2:], "cpu_porcentagem": cpuPorcentagem, "ram_porcentagem": ramPorcentagem})

  with open('registros.csv', 'w', newline='') as csvfile:
    fieldnames = ['mac_address', 'cpu_porcentagem', 'ram_porcentagem']
    writer = csv.DictWriter(csvfile, fieldnames = fieldnames)
    writer.writeheader()
    writer.writerows(data)
  
  s3 = boto3.resource('s3')
  s3.Bucket("s3-raw-mktsf").upload_file("registros.csv", "registros" + str(contagem) + ".csv")

  time.sleep(5)
