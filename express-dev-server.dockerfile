FROM node:18

WORKDIR /usr/src/app

EXPOSE 5001

CMD [ "npx", "nodemon", "packages/express-dev-app/src/index.ts" ]
