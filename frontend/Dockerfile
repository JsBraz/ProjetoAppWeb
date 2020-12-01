FROM node:12.14.1

# set working directory
RUN mkdir /frontend
WORKDIR /frontend

# install and cache app dependencies
COPY package.json /frontend/package.json
RUN npm install
RUN npm update
RUN npm install -g @angular/cli 

COPY . /frontend

EXPOSE 4200 

# start app
CMD ["npm", "run", "start"]

