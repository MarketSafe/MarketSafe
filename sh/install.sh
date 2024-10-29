#!/bin/bash

# install_docker.sh:
# adicionando as chaves GPG (GNU Privacy Guard) do docker
sudo apt-get update
sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# adicionando o repositório do docker como fontes do APT
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update

#instalando as últimas versões
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin -y

# adicionando o usuário no grupo docker para não precisar mais do sudo
sudo usermod -aG docker $USER
# newgrp docker

# install mysql:
sudo systemctl start docker
sudo systemctl enable docker
docker pull mysql:8.0.37
docker run -d -p 3306:3306 --name db -e "MYSQL_ROOT_PASSWORD=urubu100" mysql:8.0.37

# install npm:
sudo apt install npm -y

# clonar repositório:
git clone https://github.com/MarketSafe/MarketSafe.git

# install python:
sudo apt install python3-pip -y
sudo apt install python3-venv -y
python3 -m venv amb
source amb/bin/activate

# install python lib:
pip install psutil boto3 atlassian-python-api mysql-connector-python python-dotenv

# configuração das variáveis de ambiente do python:
cd ~/MarketSafe/python
cp .env.example .env
# inserir as credenciais (coloca um = no final de cada linha e insere os valores entre aspas duplas, sem espaços dos lados do igual)
# nano .env

npm i
npm start
