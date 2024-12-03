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

    def verificar_valor():

        cursor.execute("select count(*) from monitoramento;")
        valoresTabela = cursor.fetchone()[0]

        if valoresTabela == 0:

            insert = ("INSERT INTO monitoramento (data_hora, cpu_porcentagem, ram_porcentagem, fk_totem) VALUES (DEFAULT, %s, %s, %s);")

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
                
        
        mydb.commit()

    verificar_valor()

    cursor.close()
    mydb.close()

    time.sleep(descanso)

#    print ( "{:.2f}GB".format(disco_utilizado))

 


#insert into dadosteste values 
#(default, 239);