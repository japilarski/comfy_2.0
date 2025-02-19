FROM node:lts-alpine3.17

WORKDIR /usr/src/app

EXPOSE 5001

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npm run db:deploy && npm run db:seed

CMD ["npx", "nodemon", "packages/express-dev-server/src/index.ts"]
