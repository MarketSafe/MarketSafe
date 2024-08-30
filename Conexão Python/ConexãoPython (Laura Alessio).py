import psutil
import pymysql
import time
import threading

def calcMedidas():
    maquina = 1  
    
    while True:
        try:
            disco = psutil.disk_usage('C:\\').percent
            processador = psutil.cpu_percent()
            memoria = psutil.virtual_memory().percent

            conexao = pymysql.connect(
                host='localhost', 
                user='root',  
                password='Newyork2006@', 
                database='desafio'
            )
            
            cursor = conexao.cursor()
            
            cursor.execute('''
                INSERT INTO info (Processador, Memoria, Disco, maquina) 
                VALUES (%s, %s, %s, %s)
            ''', (processador, memoria, disco, maquina))
            
            conexao.commit()
            cursor.close()
            conexao.close()
        
        except Exception as e:
            print(f'Erro: {e}')
        
        maquina = maquina + 1 if maquina < 5 else 1
        time.sleep(5)

def client():

    conexao = pymysql.connect(
                host='localhost', 
                user='root',  
                password='Newyork2006@', 
                database='desafio'
            )
            
    cursor = conexao.cursor()    

    print("Escolha uma das máquinas abaixo:")
    print("1 - Máquina 1")
    print("2 - Máquina 2")
    print("3 - Máquina 3")
    print("4 - Máquina 4")
    print("5 - Máquina 5")

    maquina = input("Digite sua escolha (1, 2, 3, 4, 5): ")

    if maquina not in ["1", "2", "3", "4", "5"]:
        print("Opção inválida. Tente novamente.")
        return


    print("Escolha uma das opções abaixo:")
    print("1 - Processador")
    print("2 - Memória")
    print("3 - Disco")

    unidade = input("Digite sua escolha (1, 2, 3): ")
    
    if unidade == "1":
        coluna = "Processador"
    elif unidade == "2":
        coluna = "Memoria"
    elif unidade == "3":
        coluna = "Disco"
    else:
        print("Opção inválida. Tente novamente.")
        return


    query = f'''
        SELECT {coluna} FROM info WHERE maquina = %s;
    '''
    
    cursor.execute(query, (maquina,))
    resultados = cursor.fetchall()

    for resultado in resultados:
        print(f'{resultado[0]:.2f}%')
        time.sleep(5)
    
    cursor.close()
    conexao.close()

thread = threading.Thread(target=calcMedidas)
thread.daemon = True
thread.start()

client()
