FROM node:16.16.0 AS development

WORKDIR /demo-task/company-management/src/app

COPY package*.json ./

RUN npm install glob rimraf

RUN npm install

COPY . .

RUN npm run build