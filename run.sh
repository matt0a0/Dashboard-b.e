# Cria o build do projeto em nodeJS
npm run build

#Cria a imagem docker do projeto buildado
sudo docker build -t marlonmatos23/barco-dash:latest .

# Subir a imagem docker para o docker hub
sudo docker push marlonmatos23/barco-dash:latest
