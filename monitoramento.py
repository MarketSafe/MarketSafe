import psutil
import time
import pymysql
import socket

hostname = socket.gethostname()
sua_maquina = 1
maquinas = []

def verifyMachine():
    global sua_maquina
    conexao = pymysql.connect(
        host='localhost', 
        user='root',  
        password='231004my', 
        database='marketsafe'
    )
    cursor = conexao.cursor()

     # FAZ UMA VERIFICAÇÃO PARA VER SE A MAQUINA EXISTE NO BD
    consulta_maquina = "SELECT idmaquina, hostname FROM maquina WHERE hostname = %s;"
    cursor.execute(consulta_maquina, (hostname,))
    resultados_mysql = cursor.fetchall()

    if not resultados_mysql:
         # INSERT DE UMA MÁQUINA NOVA
        cursor.execute('INSERT INTO maquina (hostname) VALUES (%s)', (hostname,))
        conexao.commit()

         # RECUPERA O ID DA MÁQUINA NOVA, O ULTIMO ID
        cursor.execute("SELECT LAST_INSERT_ID();")
        sua_maquina = cursor.fetchone()[0]
    else:

        # ID DE ALGUMA MAQUINA
        sua_maquina = resultados_mysql[0][0]

    # TODOS OS IDS
    consulta_maquina = "SELECT idmaquina FROM maquina;"
    cursor.execute(consulta_maquina)
    maquinas_mysql = cursor.fetchall()

    maquinas.clear()
    for maquina in maquinas_mysql:
        maquinas.append(maquina[0])

    cursor.close()
    conexao.close()

def calcular_media(cursor, componente, metrica, tipo_media):
    global maquina_opcao
    if componente == 'cpu':
        col_name = 'Processador'
    elif componente == 'memoria':
        if metrica == 'percentual':
            col_name = 'Memoria'
        else:
            col_name = 'MemoriaUsada'
    
    if tipo_media == 'média total':
        query = f"SELECT AVG({col_name}) FROM registro"
    else:
        query = f"SELECT AVG({col_name}) FROM registro WHERE fkmaquina = %s"

    cursor.execute(query, (maquina_opcao,) if tipo_media == 'média por máquina' else ())
    resultado = cursor.fetchone()[0]
    
    return resultado

def monitorar():
    global maquina_opcao
    print("\nEscolha uma máquina para monitorar:\n")
    for i, maquina_id in enumerate(maquinas, start=1):
        print(f"{i} - Máquina {maquina_id}")

    maquina_opcao = input("Digite sua escolha: ")

    try:
        nome = maquinas[int(maquina_opcao) - 1]
        maquina = f"m{nome}"
    except (IndexError, ValueError):
        print("Escolha inválida. Por favor, tente novamente.")
        return

    print("\nEscolha uma das opções abaixo:\n")
    print("1 - Processador")
    print("2 - Memória")
    print("3 - Memória Usada\n")

    unidade = input("Digite sua escolha (1, 2, 3): ")

    if unidade == '1':
        componente = 'cpu'
        metrica = 'percentual'
    elif unidade == '2':
        componente = 'memoria'
        metrica = 'percentual'
    elif unidade == '3':
        componente = 'memoria'
        metrica = 'bytes'
    else:
        print("Escolha inválida. Por favor, tente novamente.")
        return

    print("\nEscolha o tipo de média:\n")
    print("1 - Média por máquina")
    print("2 - Média total\n")

    media_opcao = input("Digite sua escolha (1, 2): ")

    if media_opcao == '1':
        media = 'média por máquina'
    elif media_opcao == '2':
        media = 'média total'
    else:
        print("Escolha inválida. Por favor, tente novamente.")
        return

    con = pymysql.connect(
        host="localhost",
        user="root",
        password="231004my",
        database="marketsafe"
    )

    cursor = con.cursor()

    print("\n" + "="*40)
    print("Escolhas do Usuário")
    print("="*40)
    print(f"Máquina: {maquina}")
    print(f"Componente: {componente}")
    print(f"Métrica: {metrica}")
    print(f"Tipo de Média: {media}")
    print("="*40 + "\n")

    try:
        while True:
            valor_cpu = psutil.cpu_percent()
            valor_memoria_percentual = psutil.virtual_memory().percent
            valor_memoria_bytes = psutil.virtual_memory().used
            valor_memoria_gb = valor_memoria_bytes / (1024 ** 3) 
            
            cursor.execute("""
                INSERT INTO registro (Processador, Memoria, MemoriaUsada, fkmaquina)
                VALUES (%s, %s, %s, %s)
            """, (
                valor_cpu,
                valor_memoria_percentual,
                valor_memoria_bytes,
                sua_maquina
            ))

            con.commit()

            print(f"Máquina: {maquina}")
            if componente == 'cpu':
                print(f"CPU: {valor_cpu}%")
            elif componente == 'memoria':
                if metrica == 'percentual':
                    print(f"Memória (percentual): {valor_memoria_percentual}%")
                else:
                    print(f"Memória (GB): {valor_memoria_gb:.2f} GB")  

            if media in ['média por máquina', 'média total']:
                media_calculada = calcular_media(cursor, componente, metrica, media)
                unidade = 'GB' if metrica == 'bytes' else '%'
                media_calculada = round(media_calculada / (1024 ** 3), 2) if metrica == 'bytes' else round(media_calculada, 2)
                print(f"Média {componente} ({media}): {media_calculada} {unidade}")
                print("="*40 + "\n")

            time.sleep(5)

    except KeyboardInterrupt:
        print("Monitoramento interrompido.\n")

    finally:
        cursor.close()
        con.close()

while True:
    verifyMachine()
    monitorar()
    
    while True:
        restart = input("Deseja reiniciar o monitoramento? (s/n):\n ").lower()
        if restart == 's':
            break  
        elif restart == 'n':
            print("Monitoramento encerrado.")
            exit()
        else:
            print("Opção inválida. Por favor responda 's' ou 'n'.")
