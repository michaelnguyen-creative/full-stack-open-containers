FROM node:19-alpine

WORKDIR /app
RUN mkdir ./build

COPY . .
# COPY --chown=node:node . .

# USER node

ENV REACT_APP_BACKEND_URL=http://localhost:3003

RUN npm ci --only=production

RUN npm run build