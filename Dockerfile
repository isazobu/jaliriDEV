FROM node:alpine

RUN mkdir -p /usr/src/jaliri && chown -R node:node /usr/src/jaliri

WORKDIR /usr/src/jaliri

COPY package.json yarn.lock ./

USER node

RUN yarn install --pure-lockfile

COPY --chown=node:node . .

EXPOSE 3000
