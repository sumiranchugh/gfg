FROM node:lts-slim

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json /usr/src/app/package.json
COPY src /usr/src/app/src
RUN npm install --silent
RUN npm install react-scripts@3.0.1 -g --silent

# start app
CMD [ "npm", "start" ]