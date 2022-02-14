import dotenv from 'dotenv';
dotenv.config();

const config = {
  server: {
    port: process.env.PORT || 8081,
  },
  scraper: {
    host: 'scraper',
    port: 80,
    scrapeTime: 120000,
  },
  apiGateway: {
    baseUrl: 'https://yp5obhxoa4.execute-api.eu-central-1.amazonaws.com/',
  },
};

export default config;
