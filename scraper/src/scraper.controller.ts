import { NextFunction, Request, Response } from 'express';
import { HTTPStatusCode } from './@types/http';
import service from './scraper.service';

const controller = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const pastes = await service.getAllPastes();
    res.status(HTTPStatusCode.OK).json(pastes);
  } catch (error) {
    next(error);
  }
};

export { controller };
