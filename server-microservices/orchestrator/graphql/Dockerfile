FROM node:18.17.0

ENV PORT=4000

WORKDIR /graphql

COPY ["package.json", "package-lock.json", "./"]

RUN npm install

RUN npm install -g nodemon

COPY . .

CMD ["nodemon", "app.js"]