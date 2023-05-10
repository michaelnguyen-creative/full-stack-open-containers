FROM node:19-alpine

WORKDIR /app

COPY --chown=node:node . .
RUN npm ci --only=production

USER node

CMD npm start