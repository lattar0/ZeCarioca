FROM node:16-alpine

WORKDIR /usr/app

COPY package.json .
COPY yarn.lock .

RUN yarn --prod

COPY . .
CMD ["yarn", "start"]