
FROM node:latest

WORKDIR /usr/app

COPY package*.json .

# RUN npm install --quiet

RUN ["npm", "install", "--build"]

COPY ./ ./

CMD ["npm", "start"]