#  Júlia Apolinario
# RA: 04241006
import psutil
import time
import mysql.connector

# Conexão com o banco de dados
conexao = mysql.connector.connect(
    host="localhost",
    user="root",
    password="juliacosta",
    database="calculo"
)

cursor = conexao.cursor()

def monitorar(componente, metrica):
    if componente == 'cpu':
        if metrica == 'percentual':
            uso = psutil.cpu_percent(interval=1)
        elif metrica == 'bytes':
            uso = psutil.virtual_memory().used
        cont = psutil.cpu_count()
    elif componente == 'memória':
        if metrica == 'percentual':
            uso = psutil.virtual_memory().percent
        elif metrica == 'bytes':
            uso = psutil.virtual_memory().used
        cont = None
    elif componente == 'disco':
        if metrica == 'percentual':
            uso = psutil.disk_usage('/').percent
        elif metrica == 'bytes':
            uso = psutil.disk_usage('/').used
        cont = None

    print(f"Uso de {componente} ({metrica}): {uso}")
    if cont:
        print(f"Contagem de {componente}: {cont}")

    sql = "INSERT INTO medida (porcentagem_cpu, numero_core) VALUES (%s, %s);"
    valores = (uso, cont)

    cursor.execute(sql, valores)
    conexao.commit()

    print(cursor.rowcount, "registro inserido.")

def menu():
    while True:
        print("Menu de opções:")
        print("1- Escolha a máquina que você quer monitorar (m1, m2, m3, m4, etc):")
        maquina = input("Digite a máquina: ")

        print("2 - Qual componente você deseja monitorar (cpu, memória, disco):")
        componente = input("Digite o componente: ")

        print("3 - Escolha a métrica dentre as opções: a) percentual; b) Bytes")
        metrica_opcao = input("Digite a métrica (a ou b): ")
        metrica = 'percentual' if metrica_opcao == 'a' else 'bytes'

        print("4 - Qual o tipo de medida você quer saber: a) média por máquina; b) média total")
        tipo_medida = input("Digite o tipo de medida (a ou b): ")

        monitorar(componente, metrica)

menu()
