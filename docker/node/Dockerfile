FROM node:16

WORKDIR /var/www/discord-server

COPY ./ ./

RUN npm i

CMD ["node", "ace", "serve", "--watch"]

EXPOSE 3333
