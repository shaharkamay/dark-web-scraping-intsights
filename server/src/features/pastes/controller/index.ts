import { NextFunction, Request, Response } from 'express';
import { HTTPStatusCode } from '../../../@types/http';
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

export { getPastes };
