#Add Node
FROM node:14

# run Build
COPY ./client /client
RUN cd /client
WORKDIR /client
RUN npm i
RUN npm run build
RUN cd ../

#copy client/build to server
# COPY ./client/build server/client
# WORKDIR /usr/src/app

#run server
COPY ./server /server
RUN cd /server
WORKDIR /server
RUN npm i
RUN npm run build

EXPOSE 8081

#start server
CMD [ "npm","start" ]

# FROM node:14

# WORKDIR /usr/src/app

# COPY package*.json ./

# COPY . .

# RUN npm install

# RUN npm run build

# EXPOSE 3001

# CMD ["npm" , "start"]
