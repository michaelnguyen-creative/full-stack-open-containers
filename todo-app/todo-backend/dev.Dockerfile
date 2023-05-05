FROM node:19-bullseye

WORKDIR /usr/src/app
COPY . .
RUN npm i

CMD npm run dev