FROM node:15.4

WORDIR /app

COPY package*.json .

RUN npm install

COPY . .

CMD npm run start:dev