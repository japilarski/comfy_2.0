FROM node:20

WORKDIR /usr/src/app

EXPOSE 3000

COPY package.json package-lock.json ./

RUN npm ci

COPY . ./

CMD ["npm", "run", "frontend:dev"]
