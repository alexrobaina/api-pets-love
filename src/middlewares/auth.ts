import { Response, Request } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/config';
import { MUST_AUTHENTICATED } from '../constants/constants';
import {
  USER_VET_ROLE,
  USER_SUPER_ROLE,
  USER_ADMIN_ROLE,
  USER_ADOPTER_ROLE,
  USER_SHELTER_ROLE,
} from '../database/models/constants/roles';

//=====================================
// CONFIG token
//=====================================

export const verificaToken = function (req: Request, res: Response, next: any) {
  const headersToken = req.headers?.authorization || '';
  const token: string = headersToken.split(' ')[1];

  jwt.verify(token, config.SEED, (err: any, decoded: any) => {
    if (err) {
      return res.status(401).json({
        ok: false,
        err: {
          mensaje: 'Must be authenticated 🙄',
        },
      });
    }
    req.user = decoded;
    next();
  });
};

export const verificaRole_Admin = (req: any, res: Response, next: any) => {
  const user: any = req.user;

  if (user.role === USER_ADMIN_ROLE) {
  } else {
    return res.status(401).json({
      ok: false,
      mensaje: {
        mensaje: MUST_AUTHENTICATED,
      },
    });
  }
  next(); // Is very important for excute of the function
};

export const verificaRole_Super = (req: any, res: Response, next: any) => {
  const user = req.user;

  if (user.role === USER_SUPER_ROLE) {
  } else {
    return res.status(401).json({
      ok: false,
      mensaje: {
        mensaje: MUST_AUTHENTICATED,
      },
    });
  }
  next(); // Is very important for excute of the function
};

export const verificaRole_User = (req: any, res: Response, next: any) => {
  const user = req.user;

  if (
    user.role === USER_ADOPTER_ROLE ||
    user.role === USER_VET_ROLE ||
    user.role === USER_SHELTER_ROLE
  ) {
  } else {
    return res.status(401).json({
      ok: false,
      mensaje: {
        mensaje: MUST_AUTHENTICATED,
      },
    });
  }
  next(); // Is very important for excute of the function
};
