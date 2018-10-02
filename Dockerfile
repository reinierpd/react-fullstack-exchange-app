FROM node:8

# Set a working directory
WORKDIR /usr/src/app

RUN npm config set proxy http://192.168.3.1:8080/
RUN npm config set https-proxy http://192.168.3.1:8080/
RUN npm config set strict-ssl false

# Install Node.js dependencies
RUN npm i -g create-react-app
RUN npm i -g nodemon

# Set default command
CMD [ "yarn", "start" ]
