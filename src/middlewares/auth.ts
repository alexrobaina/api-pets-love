import { Response, Request } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/config';
import { MUST_AUTHENTICATED } from '../constants/constants';
import { VETERINARIAN, ADMIN, ADOPTER, SHELTER } from '../database/constants/roles';

//=====================================
// CONFIG token
//=====================================

export const verifyToken = function (req: Request, res: Response, next: any) {
  const headersToken = req.headers?.authorization || '';
  const token: string = headersToken.split(' ')[1];

  jwt.verify(token, config.JWT_SEED, (err: any, decoded: any) => {
    if (err) {
      return res.status(401).json({
        ok: false,
        err: {
          mensaje: MUST_AUTHENTICATED,
        },
      });
    }

    req.user = decoded;
    next();
  });
};

export const verifyRole_Admin = (req: any, res: Response, next: any) => {
  const user: any = req.user;

  if (user.role === ADMIN) {
    next(); // Is very important for excute of the function
  } else {
    return res.status(401).json({
      ok: false,
      mensaje: {
        mensaje: MUST_AUTHENTICATED,
      },
    });
  }
};

export const verifyRole_Super = (req: any, res: Response, next: any) => {
  const user = req.user;

  if (user.role === ADMIN) {
    next();
  } else {
    return res.status(401).json({
      ok: false,
      mensaje: {
        mensaje: MUST_AUTHENTICATED,
      },
    });
  }
};

export const verifyRole_User = (req: any, res: Response, next: any) => {
  const user = req.user;

  if (user.role === ADOPTER || user.role === VETERINARIAN) {
    next(); // Is very important for excute of the function
  } else {
    return res.status(401).json({
      ok: false,
      mensaje: {
        mensaje: MUST_AUTHENTICATED,
      },
    });
  }
};
