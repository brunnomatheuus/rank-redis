FROM node:latest as react-build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . ./

RUN yarn build

CMD ["npm", "start"]
