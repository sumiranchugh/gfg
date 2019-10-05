FROM node:lts-slim

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json /usr/src/app/package.json
COPY .babelrc /usr/src/app/.babelrc
COPY src /usr/src/app/src
RUN npm install --silent

# start app
CMD ["npm", "run","dev"]

EXPOSE 8000