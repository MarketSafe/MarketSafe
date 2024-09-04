import psutil
import pymysql
import time
import threading
import queue
import socket

hostname = socket.gethostname()
maquina_escolhida = 1
dados_fila = queue.Queue()
maquinas = []

def verifyMachine():
    global maquina_escolhida
    conexao = pymysql.connect(
                host='localhost', 
                user='root',  
                password='fama020312', 
                database='marketsafe'
            )
    cursor = conexao.cursor()

    consulta_maquina = "SELECT idmaquina, hostname from maquina;"
    cursor.execute(consulta_maquina)
    resultados_mysql = cursor.fetchall()

    if not resultados_mysql:
        cursor.execute('INSERT INTO maquina (hostname) VALUES (%s)', (hostname))
        conexao.commit()
    else:
        existe = any(hostname in indice for indice in resultados_mysql)

        if existe:
            maquina_escolhida = resultados_mysql[0][0]
        else:
            cursor.execute('INSERT INTO maquina (hostname) VALUES (%s)', (hostname))
            conexao.commit()
            maquina_escolhida = resultados_mysql[-1][0] + 1
            print("erro aqui 2")
    
    consulta_maquina = "SELECT idmaquina from maquina;"
    cursor.execute(consulta_maquina)
    maquinas_mysql = cursor.fetchall()

    for maquina in maquinas_mysql:
        maquinas.append(maquina[0])

    cursor.close()
    conexao.close()
verifyMachine()


def calcMedidas():
    global maquina_escolhida
    
    while True:
        try:
            processador = psutil.cpu_percent(interval=2)
            memoria = psutil.virtual_memory().percent
            memoria_usada = psutil.virtual_memory().used

            conexao = pymysql.connect(
                host='localhost', 
                user='root',  
                password='fama020312', 
                database='marketsafe'
            )
            
            cursor = conexao.cursor()
            
            cursor.execute('''
                INSERT INTO info (Processador, Memoria, MemoriaUsada, fkmaquina) 
                VALUES (%s, %s, %s, %s)
            ''', (processador, memoria, memoria_usada, maquina_escolhida))
            
            conexao.commit()
           
            dados_fila.put((processador, memoria, memoria_usada, maquina_escolhida))
            
            cursor.close()
            conexao.close()
        
        except Exception as e:
            print(f'Erro: {e}')
        
        time.sleep(5)

def client():
    global maquina_escolhida
    global maquinas

    while True:
        print("\nEscolha uma das máquinas abaixo:")
    
        for machine in maquinas:
            print(f"{machine} - Máquina {machine}")

        escolha_maquina = int(input(f"Digite sua escolha {maquinas}: "))

        existe = escolha_maquina in maquinas
  
        if not existe:
            print("Opção inválida. Tente novamente.")
            continue

        maquina_escolhida = int(escolha_maquina)  

        print("\nEscolha uma das opções abaixo:")
        print("1 - Processador")
        print("2 - Memória")
        print("3 - Memória Usada")

        unidade = input("Digite sua escolha (1, 2, 3): ")
        
        if unidade == "1":
            coluna = "Processador"
        elif unidade == "2":
            coluna = "Memoria"
        elif unidade == "3":
            coluna = "MemoriaUsada"
        else:
            print("Opção inválida. Tente novamente.")
            continue

        print("\nEscolha o tipo de média:")
        print("1 - Média total")
        print("2 - Média por máquina")

        tipo_media = input("Digite sua escolha (1 ou 2): ")
        
        print("\n" + "="*40)
        print("Escolhas do Usuário")
        print("="*40)
        print(f"Máquina: {maquina_escolhida}")
        print(f"Componente: {coluna}")
        print(f"Tipo de Média: {'Média total' if tipo_media == '1' else 'Média por máquina'}")
        print("="*40 + "\n")

        try:
            while True:
                conexao = pymysql.connect(
                host='localhost', 
                user='root',  
                password='fama020312', 
                database='marketsafe'
            )
                
                cursor = conexao.cursor()

                if tipo_media == "1":
                    cursor.execute(f"SELECT AVG({coluna}) FROM info")
                else:
                    cursor.execute(f"SELECT AVG({coluna}) FROM info WHERE fkmaquina = %s", (maquina_escolhida,))

                media_resultado = cursor.fetchone()[0]

                processador, memoria, memoria_usada, maquina = dados_fila.get()
                
                if maquina == maquina_escolhida:
                    if unidade == "1":
                        print("="*60)
                        print(f'Processador: {processador:.2f}%')
                        print(f'Média do Processador: {media_resultado:.2f}%\n')
                    elif unidade == "2":
                        print("="*60)
                        print(f'Memória: {memoria:.2f}%')
                        print(f'Média da Memória: {media_resultado:.2f}%\n')
                    elif unidade == "3":
                        memoria_usada_gb = memoria_usada / (1024 ** 3)
                        print("="*60)
                        print(f'Memória Usada: {memoria_usada_gb:.2f} GB')
                        print(f'Média da Memória Usada: {media_resultado / (1024 ** 3):.2f} GB\n')
                
                cursor.close()
                conexao.close()
                
                time.sleep(5)
                    
        except KeyboardInterrupt:
            print("\nMonitoramento Interrompido!")
            while True:
                restart = input("Deseja reiniciar o programa? (s/n): ").lower()
                if restart == 's':
                    break 
                elif restart == 'n':
                    print("Monitoramento encerrado")
                    return
                else: 
                    print("Opção inválida. Por favor digite 's' ou 'n'.")

thread = threading.Thread(target=calcMedidas)
thread.daemon = True
thread.start()

client()
