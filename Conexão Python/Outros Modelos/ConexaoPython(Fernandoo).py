import psutil
import time
import mysql.connector
import socket
import hashlib

hostname = socket.gethostname()

def hostname_para_inteiro(hostname):
    # Converte o hostname para bytes e gera um hash MD5
    hash = hashlib.md5(hostname.encode())
    # Converte o hash em um valor inteiro
    return (int(hash.hexdigest(), 16)) % (10**1)
hostname_convertido = hostname_para_inteiro(hostname)

mydb = mysql.connector.connect(
  host="localhost",
  user="aluno",
  password="sptech",
  database="marketsafe")
mycursor = mydb.cursor()

maquinas = []
consulta_maquina = "SELECT idmaquina from maquina;"
mycursor.execute(consulta_maquina)
resultados_mysql = mycursor.fetchall()

metrica = 0
for resultado in resultados_mysql:
  maquinas.append(resultado[0])
  if resultado[0] == hostname_convertido:
    metrica += 1
if metrica == 0:
  mycursor.execute('INSERT INTO maquina (idmaquina) VALUES (%s)', (hostname_convertido,))
  mydb.commit()

x = 5
resposta = 0
while(resposta != 3):

    resposta = int(input('Bem vindo ao sistema de monitoramento da MarketSafe, o que deseja ver? \n\n 1- Dados em tempo real \n 2- Média \n 3- Sair \n'))

    print("De qual máquina deseja ver os dados?")

    for machine in maquinas:
       print(machine)

    machine = int(input("Escolha: "))

    if resposta == 1:
       componente = int(input("Qual componente você deseja monitorar? \n\n 1 -) CPU \n 2 -) DISCO \n 3 -) RAM \n"))

       match componente:
          case 1: 
            y = 0
            while(y < x):
                y += 1

                memoria = psutil.virtual_memory()
                memoria_total_Gb = memoria.total / (1024**3)
                memoria_used_Gb = memoria.used / (1024**3)
                memoria_percent = memoria.percent
                disco = psutil.disk_usage('C:\\')
                livre = disco.free / (1024**3)
                uso_cpu = psutil.cpu_percent(interval=1)
                sql = "INSERT INTO registro (cpu, mem_total, mem_used, disco, fkmaquina) VALUES (%s, %s, %s, %s, %s)"
                val = (uso_cpu, memoria_total_Gb, memoria_used_Gb, livre, hostname_convertido)
                mycursor.execute(sql, val)
                mydb.commit()
                time.sleep(1)

                print("CPU: {:.2f}".format(uso_cpu))
                time.sleep(1)
          case 2:
            y = 0
            while(y < x):
                y += 1

                memoria = psutil.virtual_memory()
                memoria_total_Gb = memoria.total / (1024**3)
                memoria_used_Gb = memoria.used / (1024**3)
                memoria_percent = memoria.percent
                disco = psutil.disk_usage('C:\\')
                livre = disco.free / (1024**3)
                uso_cpu = psutil.cpu_percent(interval=1)
                sql = "INSERT INTO registro (cpu, mem_total, mem_used, disco, fkmaquina) VALUES (%s, %s, %s, %s, %s)"
                val = (uso_cpu, memoria_total_Gb, memoria_used_Gb, livre, hostname_convertido)
                mycursor.execute(sql, val)
                mydb.commit()
                time.sleep(1)

                print("Espaço livre em disco: {:.2f} Gb".format(livre))
                time.sleep(1)

                mycursor.execute(sql, val)
                mydb.commit()
          case 3:
            y = 0

            tipo_dado = int(input("Qual o tipo de dado?\n 1 -) Porcentagem \n 2 -) Gigabyte \n"))

            if tipo_dado == 1:

                while(y < x):
                    y += 1

                    memoria = psutil.virtual_memory()
                    memoria_total_Gb = memoria.total / (1024**3)
                    memoria_used_Gb = memoria.used / (1024**3)
                    memoria_percent = memoria.percent
                    disco = psutil.disk_usage('C:\\')
                    livre = disco.free / (1024**3)
                    uso_cpu = psutil.cpu_percent(interval=1)
                    sql = "INSERT INTO registro (cpu, mem_total, mem_used, disco, fkmaquina) VALUES (%s, %s, %s, %s, %s)"
                    al = (uso_cpu, memoria_total_Gb, memoria_used_Gb, livre, hostname_convertido)
                    mycursor.execute(sql, val)
                    mydb.commit()
                    time.sleep(1)

                    print("Memoria usada: {:.2f}".format(memoria_percent))
                    time.sleep(1)

                    mycursor.execute(sql, val)
                    mydb.commit()
            elif tipo_dado == 2:
                while(y < x):
                    y += 1

                    memoria = psutil.virtual_memory()
                    memoria_total_Gb = memoria.total / (1024**3)
                    memoria_used_Gb = memoria.used / (1024**3)
                    memoria_percent = memoria.percent
                    disco = psutil.disk_usage('C:\\')
                    livre = disco.free / (1024**3)
                    uso_cpu = psutil.cpu_percent(interval=1)
                    sql = "INSERT INTO registro (cpu, mem_total, mem_used, disco, fkmaquina) VALUES (%s, %s, %s, %s, %s)"
                    al = (uso_cpu, memoria_total_Gb, memoria_used_Gb, livre, hostname_convertido)
                    mycursor.execute(sql, val)
                    mydb.commit()
                    time.sleep(1)

                    print("Memoria total: {:.2f} Memória usada: {:.2f}".format(memoria_total_Gb, memoria_used_Gb) )
                    time.sleep(1)

                    mycursor.execute(sql, val)
                    mydb.commit()
               