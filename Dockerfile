FROM node:16

WORKDIR /opt/bgpicker

## Install dependencies
COPY package*.json ./
RUN npm install

## Copy app sources and build it for production
COPY public ./public
COPY src ./src
RUN yarn build

## Install serve to be used to serve the static site
RUN npm install -g serve

## Run the app
EXPOSE 3000
CMD [ "serve", "-s", "build" ]
