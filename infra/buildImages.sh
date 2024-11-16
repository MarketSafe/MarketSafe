# site (rodar no MarketSafe/site/)
sudo docker build -t testesite .
sudo docker image tag testesite giselerezende/mkts-gisele:site
sudo docker push giselerezende/mkts-gisele:site

# db (rodar no MarketSafe/site/src/database/)
sudo docker build -t testedb .
sudo docker image tag testedb giselerezende/mkts-gisele:db
sudo docker push giselerezende/mkts-gisele:db