import psutil
import time


maquinas = ["Máquina 1", "Máquina 2", "Máquina 3"]

def monitorar(maquina):
    print(f"\nMonitorando {maquina}\n")
    
    print("Escolha uma das opções abaixo:\n")
    print("1 - Processador")
    print("2 - Memória")
    print("3 - Memória Usada\n")

    unidade = input("Digite sua escolha (1, 2, 3): ")

    if unidade == '1':
        componente = 'cpu'
        metrica = 'percentual'
    elif unidade == '2':
        componente = 'memoria'
        metrica = 'percentual'
    elif unidade == '3':
        componente = 'memoria'
        metrica = 'bytes'
    else:
        print("Escolha inválida. Por favor, tente novamente.")
        return

    print("\n" + "="*40)
    print("Escolhas do Usuário")
    print("="*40)
    print(f"Máquina: {maquina}")
    print(f"Componente: {componente}")
    print(f"Métrica: {metrica}")
    print("="*40 + "\n")

    try:
        while True:
            valor_cpu = psutil.cpu_percent()
            valor_memoria_percentual = psutil.virtual_memory().percent
            valor_memoria_bytes = psutil.virtual_memory().used
            valor_memoria_gb = valor_memoria_bytes / (1024 ** 3) 
            
            print(f"Componente: {componente}")
            if componente == 'cpu':
                print(f"CPU: {valor_cpu}%\n")

            elif componente == 'memoria':
                if metrica == 'percentual':
                    print(f"Memória (percentual): {valor_memoria_percentual}%\n")
   

                else:
                    print(f"Memória (GB): {valor_memoria_gb:.2f} GB\n")

            time.sleep(5)

    except KeyboardInterrupt:
        print("Monitoramento interrompido.\n")

def escolher_maquina():
    print("\nEscolha uma máquina para monitorar:\n")
    for i, maquina in enumerate(maquinas, start=1):
        print(f"{i} - {maquina}")

    opcao_maquina = input("Digite sua escolha: ")

    try:
        maquina = maquinas[int(opcao_maquina) - 1]
        return maquina
    except (IndexError, ValueError):
        print("Escolha inválida. Por favor, tente novamente.")
        return None

while True:
    maquina = escolher_maquina()
    if maquina:
        monitorar(maquina)
    
        while True:
            restart = input("Deseja reiniciar o monitoramento? (s/n):\n ").lower()
            if restart == 's':
                break  
            elif restart == 'n':
                print("Monitoramento encerrado.")
                exit()
            else:
                print("Opção inválida. Por favor responda 's' ou 'n'.")
