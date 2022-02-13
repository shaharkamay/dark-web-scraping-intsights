import dotenv from 'dotenv';
dotenv.config();

const config = {
  server: {
    host: 'localhost',
    port: process.env.PORT || '80',
  },
  scrape: {
    url: 'http://strongerw2ise74v3duebgsvug4mehyhlpa7f6kfwnas7zofs3kov7yd.onion/all',
    interval: 120000,
  },
  tor: {
    proxy: {
      host: 'tor-proxy',
      port: 8118,
    },
  },
  ner: {
    host: 'ner',
    port: 443,
  },
  db: {
    url: process.env.DATABASE_URL,
  },
};

export default config;
