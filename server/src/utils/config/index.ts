import dotenv from 'dotenv';
dotenv.config();

const config = {
  server: {
    port: process.env.PORT || 8081,
    scrapeTime: 120000,
  },
  db: {
    url: process.env.DATABASE_URL,
    shadowUrl: process.env.SHADOW_DATABASE_URL,
  },
  NER_SERVER: {
    host: process.env.NER_SERVER_HOST || 'localhost',
    port: Number(process.env.NER_SERVER_PORT) || 8080,
  },
  torProxy: {
    host: process.env.TOR_PROXY_HOST || 'localhost',
    port: Number(process.env.TOR_PROXY_PORT) || 8118,
  },
};

export default config;
