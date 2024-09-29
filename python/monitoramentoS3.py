import time
from uuid import getnode
import csv

import psutil
import boto3

contagem = 0

while (True):
  data = []
  for _ in range(10):
    cpuPorcentagem = psutil.cpu_percent()
    ramPorcentagem = psutil.virtual_memory().percent
    data.append({"mac_address": hex(getnode())[2:], "cpu_porcentagem": cpuPorcentagem, "ram_porcentagem": ramPorcentagem})
    time.sleep(5)

  with open('registros.csv', 'w', newline='') as csvfile:
    writer = csv.DictWriter(csvfile, fieldnames = ['mac_address', 'cpu_porcentagem', 'ram_porcentagem'])
    writer.writeheader()
    writer.writerows(data)
  
  boto3.resource('s3').Bucket("s3-raw-mktsf").upload_file("registros.csv", "registros" + str(contagem) + ".csv")
