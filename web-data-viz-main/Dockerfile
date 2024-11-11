FROM node:lts-bookworm AS dependecies
WORKDIR /
COPY ./package.json ./
RUN npm i

FROM node:lts-alpine3.20 AS deploy
WORKDIR /
COPY --from=dependecies ./node_modules ./node_modules
COPY ./ ./
EXPOSE 3333
CMD [ "node", "app.js" ]
