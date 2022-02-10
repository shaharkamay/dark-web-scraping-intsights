import express from 'express';
import cors from 'cors';
import pastesRouter from './features/pastes/route';
import errorHandler from './utils/middleware/error-handling';
import { render } from './utils/helpers/server';
import pastesService from './features/pastes/service';
import NERQuery from './utils/helpers/analysis/NER';

let countNewPastes = 0;

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('../client/build'));

app.get('/', render);

app.use('/api/pastes', pastesRouter);

app.use(errorHandler);

const autoInsert = async () => {
  console.log(
    await NERQuery('John Doe works at microsoft since 1999').catch((err) =>
      console.log(err)
    )
  );
  countNewPastes = (await pastesService.insertPastes()) || 0;
  console.log(`scraped at: ${new Date()}`);
  setTimeout(autoInsert, 120000);
};
autoInsert();

export default app;
export { countNewPastes };

//natual base classifier machineClassify ner
