import dotenv from 'dotenv';
dotenv.config();

const config = {
  server: {
    host: 'localhost',
    port: process.env.PORT || '443',
  },
  stanfordServer: {
    host: 'stanford-ner',
    port: 8080,
  },
};

export default config;
