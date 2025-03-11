FROM node:20

WORKDIR /usr/src/app

EXPOSE 5001

COPY package.json package-lock.json ./

RUN npm ci

COPY . ./

CMD ["npx", "nodemon", "packages/express-dev-app/src/index.ts"]