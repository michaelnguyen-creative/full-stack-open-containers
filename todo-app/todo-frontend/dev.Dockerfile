FROM node:19-alpine
WORKDIR /usr/src/app
COPY . .
# Development mode, use npm i instead
# npm ci > production (cicd)
RUN npm i
CMD ["npm", "start"]
