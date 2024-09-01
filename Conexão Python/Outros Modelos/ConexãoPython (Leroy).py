import psutil
import time
import pymysql

while True:
    try:
        Disco = (psutil.disk_usage('C:\\').percent)
        CPU = psutil.cpu_percent()
        Mem = (psutil.virtual_memory().percent)
        
        print(f'Porcentagem de uso da CPU: {CPU}%')
        print(f'Porcentagem de uso da Memória: {Mem}%')
        print(f'Porcentagem de uso do Disco: {Disco}%')
        
        
        conexao = pymysql.connect(
            host='10.18.33.43',  
            user='usuario',  
            password='usuario123', 
            database='calc_comp'  
        )

        cursor = conexao.cursor()

        
        cursor.execute('''
        INSERT INTO info (Uso_CPU, Uso_Memoria, Uso_Disco, maquina) VALUES (%s, %s, %s,5)
        ''', (CPU, Mem, Disco))

        conexao.commit()

    
        cursor.close()
        conexao.close()

    except Exception as e:
        print(f'Erro: {e}')

    time.sleep(5)


# import pymysql

# try:
#     conexao = pymysql.connect(
#     host='127.168.56.1',
#     user='root',
#     password='Newyork2006@',
#     database='calc_comp'
#     )
#     print("Conexão bem-sucedida!")
#     conexao.close()

# except Exception as e:
#     print(f"Erro ao conectar: {e}")

