#Add Node
FROM node:14

#run server
COPY ./ /scraper
RUN cd /scraper
WORKDIR /scraper
RUN npm i
RUN npm run build

#start server
CMD [ "npm","start" ]
