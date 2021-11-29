import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { SEED_DEVELOP, SOMETHING_IS_WRONG } from '../constants/constants';

export const tokenDecoded = (req: Request, res: Response, next: any) => {
  const SEED = process.env.SEED || SEED_DEVELOP;
  // @ts-ignore
  const authorization = req.headers.authorization.split(' ')[1];

  jwt.verify(authorization, SEED, (err: any, user: any) => {
    if (err)
      return res.status(403).send({
        message: SOMETHING_IS_WRONG,
      });

    req.user = user;
    next();
  });
};
