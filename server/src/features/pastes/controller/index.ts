import { NextFunction, Request, Response } from 'express';
import pastesService from '../service';

const getPastes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = Number(req.query.page) || null;
    const pastes = await pastesService.db.getPastes(page);
    res.json(pastes);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export { getPastes };
