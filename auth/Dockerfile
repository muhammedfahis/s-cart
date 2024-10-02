FROM node:alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install --omit=dev

COPY . .

RUN npm run generate

EXPOSE 50051 3000

CMD ["npm", "start"]