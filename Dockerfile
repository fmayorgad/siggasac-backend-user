FROM node:latest

# install pm2
RUN npm install pm2 -g

WORKDIR /opt/sigasac/db
COPY ./db .
RUN npm install && npm run build

WORKDIR /opt/sigasac/utils
COPY ./utils .
RUN npm install && npm run build

WORKDIR /opt/sigasac/users
COPY ./users .
RUN npm install && npm run build

EXPOSE 3001

CMD ["pm2-dev", "/opt/sigasac/users/dist/main.js"]
