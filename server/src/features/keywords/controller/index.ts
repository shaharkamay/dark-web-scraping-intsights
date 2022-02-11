import { NextFunction, Request, Response } from 'express';
import { HTTPStatusCode } from '../../../@types/http';
import keywordService from '../service';

const getKeywords = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const keywords = await keywordService.getKeywords();
    res.status(HTTPStatusCode.OK).json(keywords);
  } catch (error) {
    next(error);
  }
};

const addKeyword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const keyword = (req.body as { keyword: string }).keyword || '';
    await keywordService.insertKeyword(keyword);
    res.status(HTTPStatusCode.OK).json('yes');
  } catch (error) {
    next(error);
  }
};

const deleteKeyword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const keyword = (req.query.keyword as string) || '';
    await keywordService.deleteKeyword(keyword);
    res.sendStatus(HTTPStatusCode.NoContent);
  } catch (error) {
    next(error);
  }
};

export { getKeywords, addKeyword, deleteKeyword };
