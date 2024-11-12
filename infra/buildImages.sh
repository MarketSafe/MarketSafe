# site (rodar no MarketSafe/site/)
sudo docker build -t testesite
sudo docker image tag testesite giselerezende/mkts:site

# db (rodar no MarketSafe/site/src/database/)
sudo docker build -t testedb
sudo docker image tag testedb giselerezende/mkts:db
