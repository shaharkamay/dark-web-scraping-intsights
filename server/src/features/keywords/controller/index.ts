import { NextFunction, Request, Response } from 'express';
import { HTTPStatusCode } from '../../../@types/http';
import keywordService from '../service';

const addKeyword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const keyword = (req.body as { keyword: string }).keyword || '';
    const isKeywordAdded = keywordService.addKeyword(keyword);
    res.status(HTTPStatusCode.OK).json(isKeywordAdded);
  } catch (error) {
    next(error);
  }
};

export { addKeyword };
