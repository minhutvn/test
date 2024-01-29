FROM node

WORKDIR /app

ADD . .

RUN yarn install

EXPOSE 8080

CMD ["yarn", "start"]