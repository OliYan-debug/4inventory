FROM node:24-alpine

WORKDIR /app

COPY 4inFrontend/package.json .

RUN npm install

RUN npm i -g serve

COPY 4inFrontend .

ARG VITE_API_URL

ENV VITE_API_URL=${VITE_API_URL}

RUN npm run build

EXPOSE 3000

CMD ["serve", "-s", "dist"]
