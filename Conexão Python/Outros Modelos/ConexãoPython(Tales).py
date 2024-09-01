#Tales Tomaz Ito
#04241046

import psutil
import time
import pymysql

iniciar = 0

while (iniciar != 2):
    # try:
        iniciar = int(input(("Deseja iniciar a captura de dados? \n 1 - Sim \n 2 - Não \n ")))
        if (iniciar == 1):
            maquina = int(input("Qual máquina deseja monitorar? (opções: 1, 2, 3, 4, etc) "))
            componente = str(input("Qual componente deseja monitorar? (opções: cpu, memoria ou disco) "))
            qtdCapturas = int(input(("Quantas capturas deseja fazer? \n ")))
            metrica = str(input("Escolha a métrica (opções: percentual ou bytes) "))
            media = str(input("Escolha a média: (media por maquina ou media total)"))

            for i in range(qtdCapturas):
                Disco = (psutil.disk_usage('/').percent)
                CPU = psutil.cpu_percent()
                Mem = (psutil.virtual_memory().percent)
                MemB = (psutil.virtual_memory().used)
                DiscoB = (psutil.virtual_memory().used)
                
                # print(f'Porcentagem de uso da CPU: {CPU}%')
                # print(f'Porcentagem de uso da Memória: {Mem}%')
                # print(f'Porcentagem de uso do Disco: {Disco}%')
                
                
                conexao = pymysql.connect(
                    host='localhost',  
                    user='aluno',  
                    password='sptech', 
                    database='dados'  
                )

                cursor = conexao.cursor()

                
                cursor.execute('''
                INSERT INTO info (Uso_CPU, Uso_Memoria, Uso_Disco, maquina) VALUES (%s, %s, %s, %d)
                ''', (CPU, Mem, Disco, maquina))

                conexao.commit()
                cursor.close()
                conexao.close()

                if (componente == 'cpu'):
                    print(f'Porcentagem de uso da CPU: {CPU}%')
                elif(componente == 'memoria'):
                    if (metrica == 'porcentagem'):
                        print(f'Porcentagem de uso da Memória: {Mem}%')
                    else:
                        print(f'Porcentagem de uso da Memória: {MemB}')
                elif(componente == 'disco'):
                    if (metrica == 'porcentagem'):
                        print(f'Porcentagem de uso da Memória: {Disco}%')
                    else:
                        print(f'Porcentagem de uso da Memória: {DiscoB}')

                time.sleep(2)
        else:
             print('Processo encerrado.')


        

    # except Exception as e:
    #     print(f'Erro: {e}')

    
