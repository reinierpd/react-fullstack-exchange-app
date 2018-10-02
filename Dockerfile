FROM node:8

# Set a working directory
WORKDIR /usr/src/app

# Install Node.js dependencies
RUN npm i -g create-react-app
RUN npm i -g nodemon

# Set default command
CMD [ "yarn", "start" ]
