import dotenv from 'dotenv';
dotenv.config();

const config = {
  server: {
    host: 'localhost',
    port: process.env.PORT || '80',
  },
  scrape: {
    url: 'http://strongerw2ise74v3duebgsvug4mehyhlpa7f6kfwnas7zofs3kov7yd.onion/all',
    proxy: {
      host: 'localhost',
      port: 8118,
    },
    interval: 120000,
  },
  ner: {
    host: 'localhost',
    port: 8080,
  },
  db: {
    url: process.env.DATABASE_URL,
  },
};

export default config;
