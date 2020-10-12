FROM node:carbon-slim

# Create app directory
WORKDIR /DayscoolAPI

# Install app dependencies
COPY package.json /DayscoolAPI/
RUN npm install

# Bundle app source
COPY . /DayscoolAPI/
RUN npm run prepublish

CMD [ "npm", "run", "runServer" ]
