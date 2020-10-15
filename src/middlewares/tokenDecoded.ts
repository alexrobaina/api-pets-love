import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';

const tokenDecoded = (req: Request, res: Response, next: any) => {
  // @ts-ignore
  const authorization = req.headers.authorization.split(' ')[1];

    jwt.verify(authorization, config.jwrSecret, (err: any, user: any) => {
      if (err) return res.status(403).send({
        message: 'Something went wrong 🙄',
      });
      
      req.user = user
      next()
  })
}

export default tokenDecoded