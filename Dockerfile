FROM node:18.17.0-alpine

WORKDIR /usr/src/app

COPY package*.json ./
COPY .env ./
COPY tsconfig.json ./
COPY src/database/prisma/schema.prisma ./

RUN yarn install


COPY . .
RUN npx prisma generate


EXPOSE 3011

CMD ["yarn", "start", "start:migrate:prod"]



