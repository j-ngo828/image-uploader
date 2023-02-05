FROM node:18.12.1-alpine

WORKDIR /app/frontend

RUN npm install -g pnpm

COPY pnpm-lock.yaml .

RUN pnpm fetch

ADD . .

RUN pnpm install -r --offline

EXPOSE 3000

CMD [ "pnpm", "run", "dev" ]
