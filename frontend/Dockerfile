FROM node:18.12.1-alpine

WORKDIR /app/frontend

RUN npm install -g pnpm

COPY pnpm-lock.yaml .

RUN pnpm fetch

ADD . .

RUN pnpm install -r --offline

CMD [ "pnpm", "dev" ]
