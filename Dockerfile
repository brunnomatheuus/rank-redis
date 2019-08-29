FROM node:12.9.0-alpine as client

WORKDIR /usr/src/app
COPY rank-redis-web/package*.json ./
RUN npm install
COPY . rank-redis-web/
RUN npm run build

ENV PORT 3000

EXPOSE 3000

CMD [ "npm", "start" ]


FROM node:12.9.0-alpine

WORKDIR /usr/src/app
COPY rank-redis/package*.json ./
RUN npm install
COPY . rank-redis/

ENV PORT 8080

EXPOSE 8080

CMD ["npm", "start"]