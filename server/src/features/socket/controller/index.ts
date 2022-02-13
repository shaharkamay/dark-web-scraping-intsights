// import { NextFunction, Request, Response } from 'express';
import config from '../../../utils/config';
import { global } from '../../../utils/globals';
import pastesService from '../../pastes/service';
import { Socket } from 'socket.io';
import { io } from '../../../index';

const socketController = (_socket: Socket) => {
  console.log('connected to socket');
  io.on('open', (open: string) => {
    console.log(open);
  });

  const sendPastes = async () => {
    const pastes = await pastesService.db.getPastes();
    io.emit('pastes', pastes);
    console.log('sent pastes through socket');
  };

  const sendAlerts = () => {
    io.emit('alerts', global.newAlerts);
    console.log('sent alerts through sse');
  };

  setInterval(() => {
    if (global.countNewPastes) {
      sendPastes();
      global.countNewPastes = 0;
    }
    if (global.newAlerts.length) {
      sendAlerts();
      global.newAlerts = [];
    }
  }, config.server.scrapeTime / 2);
};

// const sseHandler = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     res.writeHead(200, {
//       'Content-Type': 'text/event-stream',
//       Connection: 'Keep-Alive',
//     });

//     const sendPastes = async () => {
//       const pastes = await pastesService.db.getPastes();
//       res.write(`data: ${JSON.stringify({ pastes })} \n\n`);
//       console.log('sent pastes through sse');
//     };

//     const sendAlerts = () => {
//       res.write(
//         `data: ${JSON.stringify({ alerts: global.countNewAlerts })} \n\n`
//       );
//       console.log('sent alerts through sse');
//     };

//     setInterval(() => {
//       if (global.countNewPastes) {
//         sendPastes();
//         global.countNewPastes = 0;
//       }
//       if (global.countNewAlerts) {
//         sendAlerts();
//         global.countNewAlerts = 0;
//       }
//     }, config.server.scrapeTime / 2);
//   } catch (error) {
//     next(error);
//   }
// };

// export { sseHandler };
export default socketController;
