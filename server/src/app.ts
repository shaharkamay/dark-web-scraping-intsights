import express from 'express';
import cors from 'cors';
import pastesRouter from './features/pastes/route';
import keywordRouter from './features/keywords/route';
import alertsRouter from './features/alerts/route';
import sseRouter from './features/sse/route';
import errorHandler from './utils/middleware/error-handling';
import { render } from './utils/helpers/server';
import pastesService from './features/pastes/service';
import keywordsService from './features/keywords/service';
// import alertsService from './features/alerts/service';
import { countNewPastes } from './utils/globals';
import config from './utils/config';

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('../client/build'));

app.get('/', render);
app.get('/keywords', render);
app.get('/alerts', render);

app.use('/api/pastes', pastesRouter);
app.use('/api/keywords', keywordRouter);
app.use('/api/alerts', alertsRouter);
app.use('/api/sse', sseRouter);

app.use(errorHandler);

const autoInsert = async () => {
  // console.log('before before');
  // const date = new Date();
  countNewPastes.count = (await pastesService.insertPastes()) || 0;
  // console.log('new pastes: ' + countNewPastes.count);
  await keywordsService.upsertKeywords();
  // console.log('after');
  // const alerts = await alertsService.getAlertsAfterDate(date);
  // console.log(alerts);
  // console.log('new alerts: ' + alerts.length);
  // console.log(countNewAlerts);
  console.log(`scraped at: ${new Date()}`);
  setTimeout(autoInsert, config.server.scrapeTime);
};
autoInsert();

export default app;

//natual base classifier machineClassify ner
