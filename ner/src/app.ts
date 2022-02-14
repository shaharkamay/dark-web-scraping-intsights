import express from 'express';
import cors from 'cors';
import { controller } from './ner.controller';
import errorHandler from './utils/middleware/error-handling';

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/api/ner', controller);

app.use(errorHandler);

export default app;
