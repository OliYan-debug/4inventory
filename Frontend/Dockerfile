FROM node:20-alpine

ENV NODE_ENV=production

WORKDIR /app

COPY 4inFrontend/package.json .

RUN npm install

RUN npm i -g serve

COPY 4inFrontend .

ARG VITE_API_URL

RUN npm run build

EXPOSE 3000

CMD ["serve", "-s", "dist"]