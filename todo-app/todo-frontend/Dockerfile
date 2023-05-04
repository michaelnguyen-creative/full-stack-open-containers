FROM node:19-alpine AS base
WORKDIR /app
# RUN mkdir ./build
COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json

ENV REACT_APP_BACKEND_URL=http://localhost:3003
# COPY . .
# COPY --chown=node:node . .
# USER node

FROM base AS test
RUN npm ci
COPY . .
ENV CI=true
CMD ["npm", "run", "test"]

FROM test AS build
RUN npm ci --only=production
COPY . .
CMD ["npm", "run", "build"]
