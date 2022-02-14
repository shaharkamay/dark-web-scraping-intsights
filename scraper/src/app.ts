import express from 'express';
import cors from 'cors';
import { controller } from './scraper.controller';
import errorHandler from './utils/middleware/error-handling';

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/api/scrape', controller);

app.use(errorHandler);

export default app;
