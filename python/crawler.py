import json
import requests
import tempfile
import os
import json
import boto3

def lambda_handler(event, context):
  url = "https://olinda.bcb.gov.br/olinda/servico/Pix_DadosAbertos/versao/v1/odata/EstatisticasTransacoesPix(Database=@Database)?@Database='202310'&$top=500&$format=json&$select=AnoMes,PAG_PFPJ,REC_PFPJ,PAG_REGIAO,REC_REGIAO,PAG_IDADE,REC_IDADE,FORMAINICIACAO,NATUREZA,FINALIDADE,VALOR,QUANTIDADE"   

  try:
    # envia uma requisição para a API:
    resultado = requests.get(url)

    # verifica se a requisição foi bem-sucedida:
    resultado.raise_for_status()

    # decodifica o JSON:
    dados = resultado.json()

    # extrai a lista de transações Pix:
    transacoes = dados['value']

    # gera o arquivo json:
    nome_arquivo = os.path.join(tempfile.gettempdir(), 'dados.json')

    with open(nome_arquivo, mode='wt') as file:
      json.dump(transacoes, file)

    # envia para o s3:
    boto3.client('s3').upload_file(
        Filename = nome_arquivo,
        Bucket='s3-raw-mktsf',
        Key='crawler/dados.json'
    )

    return transacoes

  except requests.exceptions.RequestException as e:
    print(f"Erro na requisição: {e}")

    return None

  except json.JSONDecodeError as e:
    print(f"Erro ao decodificar JSON: {e}")
    print(f"Resposta completa da API: {resultado.text}")

    return None

print(lambda_handler(None, None))
