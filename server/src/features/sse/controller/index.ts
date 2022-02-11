import { NextFunction, Request, Response } from 'express';
import config from '../../../utils/config';
import { countNewPastes } from '../../../utils/globals';
import pastesService from '../../pastes/service';

const sseHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      Connection: 'Keep-Alive',
    });

    const sendPastes = async () => {
      const pastes = await pastesService.db.getPastes();
      res.write(`data: ${JSON.stringify({ pastes })} \n\n`);
      console.log('sent pastes through sse');
    };

    // const sendAlerts = () => {
    //   res.write(`data: ${JSON.stringify({ alerts: alerts.pastes })} \n\n`);
    //   console.log('sent alerts through sse');
    // };

    setInterval(() => {
      if (countNewPastes.count) {
        sendPastes();
      }
      // if (keywords.length !== keywordsLengthState) {
      //   sendAlerts();
      // }
    }, config.server.scrapeTime / 2);
  } catch (error) {
    next(error);
  }
};

export { sseHandler };
