import { Response, Request } from 'express';
import jwt from 'jsonwebtoken';
import { MUST_AUTHENTICATED } from '../constants/constants';
import { ADMIN_ROLE, SUPER_ROLE, USER_ROLE } from '../database/models/constants/roles';
import { SEED_DEVELOP } from '../constants/constants';

//=====================================
// CONFIGURANDO tokem
//=====================================

export const verificaToken = function (req: Request, res: Response, next: any) {
  const headersToken = req.headers?.authorization || '';
  const token: string = headersToken.split(' ')[1];
  const SEED = process.env.SEED || SEED_DEVELOP;

  jwt.verify(token, SEED, (err: any, decoded: any) => {
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

  if (user.role === ADMIN_ROLE) {
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

  if (user.role === SUPER_ROLE) {
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

  if (user.role === USER_ROLE) {
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
