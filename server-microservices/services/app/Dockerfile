FROM node:18.17.0

WORKDIR /app

ENV PORT=4002

COPY package.json package-lock.json /app/

RUN npm install && npm cache clean --force

RUN npm install -g nodemon

COPY ./ ./

CMD ["nodemon", "app.js"]