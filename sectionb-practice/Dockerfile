FROM node:16-alpine

WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm ci

ENV DEBUG=sectionb-practice:*

USER node
CMD npm start