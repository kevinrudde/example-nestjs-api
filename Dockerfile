# development stage
FROM node:15.4.0-buster as development
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .

RUN npm run build

# production stage
FROM node:15.4.0-buster-slim as production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/app
COPY --from=development /usr/src/app/ .

CMD ["node", "dist/src/main"]
