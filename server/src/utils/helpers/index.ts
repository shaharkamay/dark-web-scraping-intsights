import { NextFunction, Request, Response } from 'express';
import path from 'path';
import { Alert } from '../../@types';

const render = (_req: Request, res: Response, next: NextFunction) => {
  try {
    res.sendFile(path.resolve('../client/build/index.html'));
  } catch (err) {
    next(err);
  }
};

const globals: {
  countNewPastes: number;
  lastAlertDate: Date;
  newAlerts: Alert[];
} = {
  countNewPastes: 0,
  lastAlertDate: new Date('1/1/1999'),
  newAlerts: [],
};

export { render, globals };
