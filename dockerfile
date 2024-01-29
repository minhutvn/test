FROM node

WORKDIR /app

ADD . .

RUN yarn install --prod=true

EXPOSE 8080

CMD ["yarn", "start"]