FROM node:16-alpine
RUN apk add --update python3 make g++ && rm -rf /var/cache/apk/*
WORKDIR /home/node/app
COPY package.json ./
RUN npm install --force