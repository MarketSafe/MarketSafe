import psutil
import pymysql
import time
import threading

def calcMedidas():
    maquina = 1  
    
    while True:
        try:
            disco = psutil.disk_usage('C:\\').percent
            Processador = psutil.cpu_percent()
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
            ''', (Processador, memoria, disco, maquina))
            
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

    print("Escolha uma das opções abaixo:")
    print("1 - Media Total")
    print("2 - Media por maquina")
   

    media = input("Digite sua escolha (media total ou por maquina): ")
    
    if media == "1":
        print("Você escolheu a Máquina 1")
    elif media == "2":
        print("Você escolheu a Máquina 2")
        

    print("Escolha uma das opções abaixo:")
    print("1 - Máquina 1")
    print("2 - Máquina 2")
    print("3 - Máquina 3")
    print("4 - Máquina 4")
    print("5 - Máquina 5")

    opcao = input("Digite sua escolha (m1, m2, m3, m4, m5): ")

    if opcao == "1":
        print("Você escolheu a Máquina 1")
    elif opcao == "2":
        print("Você escolheu a Máquina 2")
    elif opcao == "3":
        print("Você escolheu a Máquina 3")
    elif opcao == "4":
        print("Você escolheu a Máquina 4")
    elif opcao == "5":
        print("Você escolheu a Máquina 5")
    else:
        print("Opção inválida. Tente novamente.")

    print("Escolha a unidade de medida desejada:")
    print("1 - CPU")
    print("2 - RAM")
    print("3 - Disco")

    uni = input("Digite sua escolha (CPU, RAM, DISCO): ")

    if uni == "1":
        print("Você escolheu a CPU")
    elif uni == "2":
        print("Você escolheu a RAM")
    elif uni == "3":
        print("Você escolheu a Disco")
    else:
        print("Opção inválida. Tente novamente.")

    print("Escolha a unidade de medida desejada:")
    print("1 - Percentual")
    print("2 - Bytes")

    medida = input("Digite sua escolha (Percentual ou Bytes): ")

    if medida == "1":
        print("Você escolheu a Percentual")
    elif medida == "2":
        print("Você escolheu a Bytes")
    else:
        print("Opção inválida. Tente novamente.")


    query = '''
        SELECT Processador FROM info WHERE maquina = 1;
'''

    query1 = '''
        SELECT Processador FROM info WHERE maquina = 2;
'''
    query2 = '''
        SELECT Processador FROM info WHERE maquina = 3;
'''
    query3 = '''
        SELECT Processador FROM info WHERE maquina = 4;
'''
    query4 = '''
        SELECT Processador FROM info WHERE maquina = 5;
'''



    query5 = '''
        SELECT Memoria FROM info WHERE maquina = 1;
'''

    query6 = '''
        SELECT Memoria FROM info WHERE maquina = 2;
'''
    query7 = '''
        SELECT Memoria FROM info WHERE maquina = 3;
'''
    query8 = '''
        SELECT Memoria FROM info WHERE maquina = 4;
'''
    query9 = '''
        SELECT Memoria FROM info WHERE maquina = 5;
'''



    query10 = '''
        SELECT Disco FROM info WHERE maquina = 1;
'''

    query11 = '''
        SELECT Disco FROM info WHERE maquina = 2;
'''
    query12 = '''
        SELECT Disco FROM info WHERE maquina = 3;
'''
    query13 = '''
        SELECT Disco FROM info WHERE maquina = 4;
'''
    query14 = '''
        SELECT Disco FROM info WHERE maquina = 5;
'''

    if opcao == "1" and uni == "1" and medida == "1":
            cursor.execute(query)
            resultados = cursor.fetchall()
            for resultado in resultados:
                print(f'{resultado[0]:.2f}%')
                time.sleep(5)
    elif opcao == "2" and uni == "1" and medida == "1":
          cursor.execute(query1)
          resultados = cursor.fetchall()
          for resultado in resultados:
                print(f'{resultado[0]:.2f}%')
                time.sleep(5)
    elif opcao == "3" and uni == "1" and medida == "1":
          cursor.execute(query2)
          resultados = cursor.fetchall()
          for resultado in resultados:
                print(f'{resultado[0]:.2f}%')
                time.sleep(5)
    elif opcao == "4" and uni == "1" and medida == "1":
          cursor.execute(query3)
          resultados = cursor.fetchall()
          for resultado in resultados:
                print(f'{resultado[0]:.2f}%')
                time.sleep(5)
    elif opcao == "5" and uni == "1" and medida == "1":
          cursor.execute(query4)
          resultados = cursor.fetchall()
          for resultado in resultados:
                print(f'{resultado[0]:.2f}%')
                time.sleep(5)

                
    if opcao == "1" and uni == "2" and medida == "1":
            cursor.execute(query5)
            resultados = cursor.fetchall()
            for resultado in resultados:
                print(f'{resultado[0]:.2f}%')
                time.sleep(5)
    elif opcao == "2" and uni == "2" and medida == "1":
          cursor.execute(query6)
          resultados = cursor.fetchall()
          for resultado in resultados:
                print(f'{resultado[0]:.2f}%')
                time.sleep(5)
    elif opcao == "3" and uni == "2" and medida == "1":
          cursor.execute(query7)
          resultados = cursor.fetchall()
          for resultado in resultados:
                print(f'{resultado[0]:.2f}%')
                time.sleep(5)
    elif opcao == "4" and uni == "2" and medida == "1":
          cursor.execute(query8)
          resultados = cursor.fetchall()
          for resultado in resultados:
                print(f'{resultado[0]:.2f}%')
                time.sleep(5)
    elif opcao == "5" and uni == "2" and medida == "1":
          cursor.execute(query9)
          resultados = cursor.fetchall()
          for resultado in resultados:
                print(f'{resultado[0]:.2f}%')
                time.sleep(5)


             
    if opcao == "1" and uni == "3" and medida == "1":
            cursor.execute(query10)
            resultados = cursor.fetchall()
            for resultado in resultados:
                print(f'{resultado[0]:.2f}%')
                time.sleep(5) 
    elif opcao == "2" and uni == "3" and medida == "1":
          cursor.execute(query11)
          resultados = cursor.fetchall()
          for resultado in resultados:
                print(f'{resultado[0]:.2f}%')
                time.sleep(5)
    elif opcao == "3" and uni == "3" and medida == "1":
          cursor.execute(query12)
          resultados = cursor.fetchall()
          for resultado in resultados:
                print(f'{resultado[0]:.2f}%')
                time.sleep(5)
    elif opcao == "4" and uni == "3" and medida == "1":
          cursor.execute(query13)
          resultados = cursor.fetchall()
          for resultado in resultados:
                print(f'{resultado[0]:.2f}%')
                time.sleep(5)
    elif opcao == "5" and uni == "3" and medida == "1":
          cursor.execute(query14)
          resultados = cursor.fetchall()
          for resultado in resultados:
                print(f'{resultado[0]:.2f}%')
                time.sleep(5)


thread = threading.Thread(target=calcMedidas)
thread.daemon = True
thread.start()

client()
