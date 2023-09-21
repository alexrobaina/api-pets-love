import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/config';
import { SOMETHING_IS_WRONG } from '../constants/constants';

export const tokenDecoded = (req: Request, res: Response, next: any) => {
  // @ts-ignore
  const authorization = req.headers.authorization.split(' ')[1];

  jwt.verify(authorization, config.JWT_SEED, (err: any, user: any) => {
    if (err)
      return res.status(403).send({
        message: SOMETHING_IS_WRONG,
      });

    req.user = user;
    next();
  });
};
