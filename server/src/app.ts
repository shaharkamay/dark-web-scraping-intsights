import express from 'express';
import cors from 'cors';
import pastesRouter from './features/pastes/route';
import errorHandler from './utils/middleware/error-handling';
import { render } from './utils/helpers/server';
import pastesService from './features/pastes/service';

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('./client/build'));

app.get('/', render);

app.use('/api/pastes', pastesRouter);

app.use(errorHandler);

const autoInsert = async () => {
  console.log(`new pastes: ${await pastesService.insertPastes()}`);
  console.log(`scraped at: ${new Date()}`);
  setTimeout(autoInsert, 120000);
};
autoInsert();

export default app;
