FROM node:lts-alpine3.20
RUN mkdir ./node_modules ./node_modules
WORKDIR /
COPY ./ ./
RUN npm i
EXPOSE 3333
CMD [ "node", "app.js" ]
