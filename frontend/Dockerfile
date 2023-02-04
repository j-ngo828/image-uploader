FROM node:18.12.1-alpine

WORKDIR /usr/app/frontend

COPY . ./

RUN npm install

RUN mkdir -p node_modules/.cache && chmod -R 777 node_modules/.cache

CMD [ "npm", "start" ]
