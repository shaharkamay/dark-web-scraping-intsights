import dotenv from 'dotenv';
dotenv.config();

const config = {
  port: process.env.PORT || 8080,
  db: {
    url: process.env.DATABASE_URL,
  },
};

export default config;
