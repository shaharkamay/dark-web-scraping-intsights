import { NextFunction, Request, Response } from 'express';
import { HTTPStatusCode } from '../../../@types/http';
// import { countNewPastes } from '../../../utils/globals';
import pastesService from '../service';

const getPastes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const query = (req.query.query as string) || null;
    const page = Number(req.query.page) || null;
    const pastes = await pastesService.db.getPastes(page, query);
    res.status(HTTPStatusCode.OK).json(pastes);
  } catch (error) {
    next(error);
  }
};

// const getPastesSse = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     res.writeHead(200, {
//       'Content-Type': 'text/event-stream',
//       Connection: 'Keep-Alive',
//     });

//     const sendPastes = async () => {
//       if (countNewPastes.count) {
//         const pastes = await pastesService.db.getPastes();
//         res.write(`data: ${JSON.stringify(pastes)} \n\n`);
//       }
//     };
//     setInterval(() => {
//       sendPastes();
//     }, 60000);
//   } catch (error) {
//     next(error);
//   }
// };

export {
  getPastes,
  /*getPastesSse*/
};
