import psutil
import time
import mysql.connector
from colorama import Fore, Style

maquina = input('Qual máquina você deseja monitorar? (m1, m2, m3, m4): ')
componente = input('Qual componente você deseja monitorar? (cpu, memória, disco): ')
metrica = input('Escolha a métrica (percentual, bytes): ')
media = input('Qual tipo de média você quer saber? (média por máquina, média total): ')

nome = 3

con = mysql.connector.connect(
    host="localhost",
    user="root",
    password="231004my",
    database="dados"
)

cursor = con.cursor()

def calcular_media(cursor, componente, metrica, tipo_media):
    
    if componente == 'cpu':
        col_name = 'usoCPU' 
    elif componente == 'memoria':
        if metrica == 'percentual':
            col_name = 'usoMemoria'
        else:
            col_name = 'MemoriaBytes'
    elif componente == 'disco':
        if metrica == 'percentual':
            col_name = 'usoDisco'
        else:
            col_name = 'MemoriaDisco'
    
    if tipo_media == 'média total':
        query = f"SELECT AVG({col_name}) FROM registros"
    else:  
        query = f"SELECT AVG({col_name}) FROM registros WHERE fkMaquina = %s"

    cursor.execute(query, (nome,) if tipo_media == 'média por máquina' else ())
    resultado = cursor.fetchone()[0]
    
    return resultado

valores = {
    'cpu': None,
    'memoria_percentual': None,
    'memoria_bytes': None,
    'disco_percentual': None,
    'disco_bytes': None
}

print(Fore.CYAN + "\n" + "="*40)
print("Escolhas do Usuário")
print("="*40 + Style.RESET_ALL)
print(f"Máquina: {maquina}")
print(f"Componente: {componente}")
print(f"Métrica: {metrica}")
print(f"Tipo de Média: {media}")
print(Fore.CYAN + "="*40 + "\n" + Style.RESET_ALL)


try:
    while True:
        if componente == 'cpu':
            valor = psutil.cpu_percent()
            valores['cpu'] = valor
            valores['memoria_percentual'] = None
            valores['memoria_bytes'] = None
            valores['disco_percentual'] = None
            valores['disco_bytes'] = None
            
        elif componente == 'memoria':
            if metrica == 'percentual':
                valor = psutil.virtual_memory().percent
                valores['cpu'] = None
                valores['memoria_percentual'] = valor
                valores['memoria_bytes'] = None
                valores['disco_percentual'] = None
                valores['disco_bytes'] = None
            else:
                valor = psutil.virtual_memory().used
                valores['cpu'] = None
                valores['memoria_percentual'] = None
                valores['memoria_bytes'] = valor
                valores['disco_percentual'] = None
                valores['disco_bytes'] = None

        elif componente == 'disco':
            if metrica == 'percentual':
                valor = psutil.disk_usage('C:\\').percent
                valores['cpu'] = None
                valores['memoria_percentual'] = None
                valores['memoria_bytes'] = None
                valores['disco_percentual'] = valor
                valores['disco_bytes'] = None
            else:
                valor = psutil.disk_usage('C:\\').used
                valores['cpu'] = None
                valores['memoria_percentual'] = None
                valores['memoria_bytes'] = None
                valores['disco_percentual'] = None
                valores['disco_bytes'] = valor

        cursor.execute("""
            INSERT INTO registros (usoCPU, usoMemoria, MemoriaBytes, usoDisco, MemoriaDisco, fkMaquina)
            VALUES (%s, %s, %s, %s, %s, %s)
        """, (
            valores['cpu'],
            valores['memoria_percentual'],
            valores['memoria_bytes'],
            valores['disco_percentual'],
            valores['disco_bytes'],
            nome
        ))

        con.commit()

        print(Fore.YELLOW + "="*60 + Style.RESET_ALL)
        print(Fore.GREEN + f"Máquina: {maquina}" + Style.RESET_ALL)
        unidade = 'bytes' if componente in ['memoria', 'disco'] and metrica == 'bytes' else '%'
        print(f'{Fore.BLUE}{componente.capitalize()}: {valor} {unidade}{Style.RESET_ALL}')

        if media in ['média por máquina', 'média total']:
            media_calculada = calcular_media(cursor, componente, metrica, media)
            unidade = 'bytes' if metrica == 'bytes' else '%'
            media_calculada = round(media_calculada, 2)
            print(f"{Fore.MAGENTA}Média {componente} ({media}): {media_calculada} {unidade}{Style.RESET_ALL}")

        time.sleep(5)

except KeyboardInterrupt:
        print(Fore.RED + "Monitoramento interrompido.\n" + Style.RESET_ALL)
        while True:
            restart = input(Fore.YELLOW + "Deseja reiniciar o monitoramento? (s/n):\n " + Style.RESET_ALL).strip().lower()
            if restart == 's':
                break  
            elif restart == 'n':
                print(Fore.RED + "Monitoramento encerrado." + Style.RESET_ALL)
                cursor.close()
                con.close()
                exit()
            else:
                print(Fore.RED + "Opção inválida. Por favor responda 's' ou 'n'." + Style.RESET_ALL)
