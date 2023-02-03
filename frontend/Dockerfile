FROM node:18.12.1-alpine

WORKDIR /app/frontend

COPY package.* ./
RUN npm install
COPY . ./

EXPOSE 3000
