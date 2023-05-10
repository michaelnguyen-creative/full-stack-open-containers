FROM node:19-alpine AS base
WORKDIR /app
COPY ["package*.json", "package*.json", "./"]
ENV REACT_APP_BACKEND_URL=http://localhost:8080/api
# COPY --chown=node:node . .
# USER node

FROM base AS test
RUN npm ci
COPY . .
ENV CI=true
RUN npm run test

FROM test AS build
RUN npm ci --only=production
RUN npm run build

FROM nginx:1.20-alpine
COPY --from=build /app/build /usr/share/nginx/html