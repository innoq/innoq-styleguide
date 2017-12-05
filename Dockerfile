FROM node:8

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install
COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]
