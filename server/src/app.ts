import express from 'express';
import cors from 'cors';
import errorHandler from './utils/middleware/error-handling';
import { render } from './utils/helpers';
import config from './utils/config';
import axios from 'axios';
import { Alert } from './@types';

const globals: {
  countNewPastes: number;
  lastAlertDate: Date;
  newAlerts: Alert[];
} = {
  countNewPastes: 0,
  lastAlertDate: new Date(),
  newAlerts: [],
};

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('../client/build'));

app.get('/', render);
app.get('/keywords', render);
app.get('/alerts', render);

app.use(errorHandler);

const autoInsert = async () => {
  const date = new Date();
  const fetchPastesResponse = await axios.get(
    `http://${config.scraper.host}:${config.scraper.port}/api/scrape`
  );
  const newPastesResponse = await axios.post(
    config.apiGateway.baseUrl + 'api/pastes',
    { pastes: fetchPastesResponse.data }
  );
  globals.countNewPastes = newPastesResponse.data;
  await axios.put(config.apiGateway.baseUrl + 'api/keywords');
  const alertsResponse = await axios.get<Alert[]>(
    config.apiGateway.baseUrl + `api/alerts?date=${date.toISOString()}`
  );
  if (alertsResponse.data && alertsResponse.data.length) {
    globals.lastAlertDate = new Date(alertsResponse.data[0].date);
    globals.newAlerts = alertsResponse.data;
  }
  console.log(`scraped at: ${new Date()}`);
  setTimeout(autoInsert, config.scraper.scrapeTime);
};
autoInsert();

export default app;
export { globals };
