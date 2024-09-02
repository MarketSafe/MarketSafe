import psutil
import pymysql
import time
import threading
import queue

maquina_escolhida = 1
dados_fila = queue.Queue()

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
                password='231004my', 
                database='desafio'
            )
            
            cursor = conexao.cursor()
            
            cursor.execute('''
                INSERT INTO info (Processador, Memoria, MemoriaUsada, maquina) 
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

    while True:
        print("\nEscolha uma das máquinas abaixo:")
        print("1 - Máquina 1")
        print("2 - Máquina 2")
        print("3 - Máquina 3")
        print("4 - Máquina 4")
        print("5 - Máquina 5")

        escolha_maquina = input("Digite sua escolha (1, 2, 3, 4, 5): ")

        if escolha_maquina not in ["1", "2", "3", "4", "5"]:
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
                    password='231004my', 
                    database='desafio'
                )
                
                cursor = conexao.cursor()

                if tipo_media == "1":
                    cursor.execute(f"SELECT AVG({coluna}) FROM info")
                else:
                    cursor.execute(f"SELECT AVG({coluna}) FROM info WHERE maquina = %s", (maquina_escolhida,))

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
