import { NextFunction, Request, Response } from 'express';
import { HTTPStatusCode } from '../../../@types/http';
import alertsService from '../service';

const getAlerts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const alerts = await alertsService.getAlerts();
    res.status(HTTPStatusCode.OK).json(alerts);
  } catch (error) {
    next(error);
  }
};

export { getAlerts };
