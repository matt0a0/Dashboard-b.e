FROM node:alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY dist/ ./dist/
COPY server.cjs .

EXPOSE 8002

CMD ["node", "server.cjs"]