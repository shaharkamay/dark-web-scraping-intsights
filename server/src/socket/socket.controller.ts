import config from '../utils/config';
import { Socket } from 'socket.io';
import { io } from '../index';
import axios from 'axios';
import { PastesResponse } from '../@types';
import { globals } from '../utils/helpers';

const socketController = (socket: Socket) => {
  io.on('open', (open: string) => {
    console.log('connected to socket');
    console.log(open);
  });

  socket.on('left-alerts', ({ date }: { date: string }) => {
    globals.lastAlertDate = new Date(date);
  });

  const sendPastes = async () => {
    const res = await axios.get<PastesResponse>(
      config.apiGateway.baseUrl + 'api/pastes'
    );
    const pastes = res.data;
    io.emit('pastes', pastes);
    console.log('sent pastes through socket');
  };

  const sendAlerts = async () => {
    io.emit('alerts', globals.newAlerts);
    console.log('sent alerts through socket');
  };

  setInterval(() => {
    if (globals.countNewPastes) {
      sendPastes();
      globals.countNewPastes = 0;
    }
    if (globals.newAlerts.length) {
      sendAlerts();
      globals.newAlerts = [];
    }
  }, config.scraper.scrapeTime / 2);
};

export default socketController;
