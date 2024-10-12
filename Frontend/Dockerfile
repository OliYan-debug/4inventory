FROM node:20-alpine

WORKDIR /app

COPY 4inFrontend/package.json .

RUN npm install

RUN npm i -g serve

COPY 4inFrontend .

RUN npm run build

EXPOSE 3000
CMD ["serve", "-s", "dist"]