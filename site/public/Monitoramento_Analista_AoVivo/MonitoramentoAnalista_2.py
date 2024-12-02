import psutil
import time
import mysql.connector
import os
from uuid import getnode
import json
import datetime
from atlassian import Jira
from requests import HTTPError
import boto3
import dotenv

descanso = 1

while True:

    dadoCPU_Totem1 = psutil.cpu_percent()   
    memoriaRam_Totem1 = psutil.virtual_memory().percent

    dadoCPU_Totem2 = dadoCPU_Totem1 * 1.2   
    memoriaRam_Totem2 = memoriaRam_Totem1 * 0.7

    dadoCPU_Totem3 = dadoCPU_Totem1 * 1.3 
    memoriaRam_Totem3 = memoriaRam_Totem1 * 0.4

    dadoCPU_Totem4 = dadoCPU_Totem1 * 0.9 
    memoriaRam_Totem4 = memoriaRam_Totem1 * 0.9
    
    dadoCPU_Totem5 = dadoCPU_Totem1 * 0.7 
    memoriaRam_Totem5 = memoriaRam_Totem1 * 0.6

    # mydb = mysql.connector.connect(
    #     host="localhost",
    #     user="root",
    #     password="Rosquinha1",
    #     database="market_safe" 
    #)

    mydb = mysql.connector.connect(
        host="localhost",
        user="root",
        password="Rosquinha1",
        database="market_safe"
    )

    cursor = mydb.cursor()

    cpu = []
    ram = []        
    totem_id = []

    def enviarAlertaJira(cpu, ram, totem_id):
        jira = Jira(
            url="",
            username="",
            password=""
    )
    
        try:
            for i, id_totem in enumerate(totem_id):
                descricao = f"O Totem '{id_totem}' está com alto uso de CPU: {cpu[i]}% e RAM: {ram[i]}%"
                jira.issue_create(
                    fields={
                        "project": {"key": "SCRUM"}, 
                        "summary": f"Alerta: Alta utilização no Totem {id_totem}",
                        "description": descricao,
                        "issuetype": {"name": "Task"}
                    }
                )
                print(f"Alerta enviado para o Totem {id_totem}")
        except Exception as e:
            print(f"Erro ao enviar alerta: {e}")

    def verificar_valor():

        cursor.execute("select count(*) from monitoramento;")
        valoresTabela = cursor.fetchone()[0]

        if valoresTabela == 0:

            insert = ("INSERT INTO monitoramento (data_hora, cpu_porcentagem, ram_porcentagem, fk_totem) VALUES (DEFAULT, %s, %s, 1);")

            valor = ([dadoCPU_Totem1, memoriaRam_Totem1],
                     [dadoCPU_Totem2, memoriaRam_Totem2],
                     [dadoCPU_Totem3, memoriaRam_Totem3],
                     [dadoCPU_Totem4, memoriaRam_Totem4],
                     [dadoCPU_Totem5, memoriaRam_Totem5])

            cursor.executemany(insert, valor)
            print("Valor inserido!")

            cursor.execute("select count(*) from TotensProblema;")
            valoresTabela = cursor.fetchone()[0]

        else:

            update = ("update monitoramento set cpu_porcentagem = %s, ram_porcentagem = %s where id = %s;")

            valor = ([dadoCPU_Totem1, memoriaRam_Totem1, 1],
                     [dadoCPU_Totem2, memoriaRam_Totem2, 2],
                     [dadoCPU_Totem3, memoriaRam_Totem3, 3],
                     [dadoCPU_Totem4, memoriaRam_Totem4, 4],
                     [dadoCPU_Totem5, memoriaRam_Totem5, 5])

            cursor.executemany(update, valor)
            print("Valor da Tabela Monitoramento atualizado!")

            if valoresTabela == 0:
            
                if dadoCPU_Totem1 > 2 or memoriaRam_Totem1 > 90:

                    insert = ("INSERT INTO TotensProblema (data_hora, cpu_porcentagem, ram_porcentagem, fk_totem) VALUES (DEFAULT, %s, %s, 1);")
                    valor =  [(dadoCPU_Totem1, memoriaRam_Totem1)]
                    cursor.executemany(insert, valor)
                    print("Valor do Totem 1 inserido!")
                    

                if dadoCPU_Totem2 > 2 or memoriaRam_Totem2 > 90:

                    insert = ("INSERT INTO TotensProblema (data_hora, cpu_porcentagem, ram_porcentagem, fk_totem) VALUES (DEFAULT, %s, %s, 2);")
                    valor =  [(dadoCPU_Totem2, memoriaRam_Totem2)]
                    cursor.executemany(insert, valor)
                    print("Valor do Totem 2 inserido!")

                if dadoCPU_Totem3 > 2 or memoriaRam_Totem3 > 90:

                    insert = ("INSERT INTO TotensProblema (data_hora, cpu_porcentagem, ram_porcentagem, fk_totem) VALUES (DEFAULT, %s, %s, 3);")
                    valor =  [(dadoCPU_Totem3, memoriaRam_Totem3)]
                    cursor.executemany(insert, valor)
                    print("Valor do Totem 3 inserido!")

                if dadoCPU_Totem4 > 2 or memoriaRam_Totem4 > 90:

                    insert = ("INSERT INTO TotensProblema (data_hora, cpu_porcentagem, ram_porcentagem, fk_totem) VALUES (DEFAULT, %s, %s, 4);")
                    valor =  [(dadoCPU_Totem4, memoriaRam_Totem4)]
                    cursor.executemany(insert, valor)
                    print("Valor do Totem 4 inserido!")

                if dadoCPU_Totem5 > 2 or memoriaRam_Totem5 > 90:

                    insert = ("INSERT INTO TotensProblema (data_hora, cpu_porcentagem, ram_porcentagem, fk_totem) VALUES (DEFAULT, %s, %s, 5);")
                    valor =  [(dadoCPU_Totem5, memoriaRam_Totem5)]
                    cursor.executemany(insert, valor)
                    print("Valor do Totem 5 inserido!")

            else:

                if dadoCPU_Totem1 > 2 or memoriaRam_Totem1 > 90:

                    update = ("update TotensProblema set cpu_porcentagem = %s, ram_porcentagem = %s where id = %s;")
                    valor =  [(dadoCPU_Totem1, memoriaRam_Totem1, 1)]
                    cursor.executemany(update, valor)
                    print("Valor do Totem 1 atualizado!")

                    cpu.append(dadoCPU_Totem1)
                    ram.append(memoriaRam_Totem1)
                    totem_id.append(1)

                if dadoCPU_Totem2 > 2 or memoriaRam_Totem2 > 90:

                    update = ("update TotensProblema set cpu_porcentagem = %s, ram_porcentagem = %s where id = %s;")
                    valor =  [(dadoCPU_Totem2, memoriaRam_Totem2, 2)]
                    cursor.executemany(update, valor)
                    print("Valor do Totem 2 atualizado!")

                    cpu.append(dadoCPU_Totem1)
                    ram.append(memoriaRam_Totem1)
                    totem_id.append(2)

                if dadoCPU_Totem3 > 2 or memoriaRam_Totem3 > 90:

                    update = ("update TotensProblema set cpu_porcentagem = %s, ram_porcentagem = %s where id = %s;")
                    valor =  [(dadoCPU_Totem3, memoriaRam_Totem3, 3)]
                    cursor.executemany(update, valor)
                    print("Valor do Totem 3 atualizado!")

                    cpu.append(dadoCPU_Totem1)
                    ram.append(memoriaRam_Totem1)
                    totem_id.append(3)

                if dadoCPU_Totem4 > 2 or memoriaRam_Totem4 > 90:

                    update = ("update TotensProblema set cpu_porcentagem = %s, ram_porcentagem = %s where id = %s;")
                    valor =  [(dadoCPU_Totem4, memoriaRam_Totem4, 4)]
                    cursor.executemany(update, valor)
                    print("Valor do Totem 4 atualizado!")

                    cpu.append(dadoCPU_Totem1)
                    ram.append(memoriaRam_Totem1)
                    totem_id.append(4)
                
                if dadoCPU_Totem5 > 2 or memoriaRam_Totem5 > 90:

                    update = ("update TotensProblema set cpu_porcentagem = %s, ram_porcentagem = %s where id = %s;")
                    valor =  [(dadoCPU_Totem5, memoriaRam_Totem5, 5)]
                    cursor.executemany(update, valor)
                    print("Valor do Totem 5 atualizado!")
                    
                    cpu.append(dadoCPU_Totem1)
                    ram.append(memoriaRam_Totem1)
                    totem_id.append(5)
                
               # enviarAlertaJira(cpu, ram, totem_id)
                    
                
        
        mydb.commit()

    verificar_valor()

    cursor.close()
    mydb.close()

    time.sleep(descanso)

#    print ( "{:.2f}GB".format(disco_utilizado))

 


#insert into dadosteste values 
#(default, 239);