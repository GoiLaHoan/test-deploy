FROM node:16-alpine
# FROM mhart/alpine-node:12
WORKDIR /usr/src/app
COPY package.json .
COPY yarn.lock .
RUN yarn

COPY . .

RUN yarn build

CMD ["yarn", "run", "start:nextcli"]
