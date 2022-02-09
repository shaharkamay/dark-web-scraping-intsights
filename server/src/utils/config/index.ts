import dotenv from 'dotenv';
dotenv.config();

const config = {
  port: process.env.PORT || 8081,
  db: {
    url: process.env.DATABASE_URL,
  },
  NER_SERVER: {
    host: 'localhost',
    port: 8080,
  },
};

export default config;
