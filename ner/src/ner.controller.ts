import { NextFunction, Request, Response } from 'express';
import { HTTPStatusCode } from './@types/http';
import service from './ner.service';

const controller = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const text = req.body.text || '';
    const entities = await service.NERQuery(text);
    res.status(HTTPStatusCode.OK).json(entities);
  } catch (error) {
    next(error);
  }
};

export { controller };
