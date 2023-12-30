FROM node:18.17.0

WORKDIR /users

ENV PORT=4001

COPY package.json package-lock.json /users/

RUN npm install && npm cache clean --force && npm install -g nodemon

COPY ./ ./

CMD ["nodemon", "app.js"]