FROM node:18

WORKDIR /usr/src/comfy
COPY package.json .
COPY tsconfig.json .

WORKDIR /usr/src/comfy/packages
COPY packages/database database
COPY packages/logger logger

WORKDIR /usr/src/comfy
RUN npm install

WORKDIR /usr/src/comfy/packages/database

RUN npm run generate:types
CMD ["sh", "-c", "npx prisma migrate deploy"]
ENTRYPOINT [ "npx ts-node src/index.ts" ]