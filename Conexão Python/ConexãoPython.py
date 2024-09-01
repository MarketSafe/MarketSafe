import psutil
import pymysql
import time
import threading

def calcMedidas():
    maquina = 1  
    
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
            ''', (processador, memoria, memoria_usada, maquina))
            
            conexao.commit()
            cursor.close()
            conexao.close()
        
        except Exception as e:
            print(f'Erro: {e}')
        
        maquina = maquina + 1 if maquina < 5 else 1
        time.sleep(5)

def client():
    while True:
        conexao = pymysql.connect(
            host='localhost', 
            user='root',  
            password='231004my', 
            database='desafio'
        )
        
        cursor = conexao.cursor()

        try:
            while True:
                print("\nEscolha uma das máquinas abaixo:")
                print("1 - Máquina 1")
                print("2 - Máquina 2")
                print("3 - Máquina 3")
                print("4 - Máquina 4")
                print("5 - Máquina 5")

                maquina = input("Digite sua escolha (1, 2, 3, 4, 5): ")

                if maquina not in ["1", "2", "3", "4", "5"]:
                    print("Opção inválida. Tente novamente.")
                    continue

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

                query = f'''
                    SELECT {coluna} FROM info WHERE maquina = %s ORDER BY idDados DESC LIMIT 1;
                '''

                print("\n" + "="*40)
                print("Escolhas do Usuário")
                print("="*40)
                print(f"Máquina: {maquina}")
                print(f"Componente: {coluna}")
                print("="*40 + "\n")
                
                cursor.execute(query, (maquina,))
                resultados = cursor.fetchone()

                for resultado in resultados:
                    if unidade == "3": 
                        print("="*60)
                        print(f'Memória Usada: {resultado} bytes\n')
                    else:
                        print("="*60)
                        print(f'{coluna}: {resultado:.2f}%\n')
                        
                time.sleep(5)
                    
        except KeyboardInterrupt:
            print("\nMonitoramento Interrompido!")
            while True:
                restart = input("Deseja reiniciar o programa? (s/n): ").lower()
                if restart == 's':
                    break 
                elif restart == 'n':
                    print("Monitoramento encerrado")
                    cursor.close()
                    conexao.close()
                    return
                else: 
                    print("Opção inválida. Por favor digite 's' ou 'n'.")

        cursor.close()
        conexao.close()

thread = threading.Thread(target=calcMedidas)
thread.daemon = True
thread.start()

client()
