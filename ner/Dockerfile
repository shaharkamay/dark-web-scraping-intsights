#Add Node
FROM node:14

#run server
COPY ./ /ner
RUN cd /ner
WORKDIR /ner
RUN npm i
RUN npm run build

#start server
CMD [ "npm","start" ]
