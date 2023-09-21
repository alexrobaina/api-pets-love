import { Response, Request } from 'express';
import { SOMETHING_IS_WRONG, SUCCESS_RESPONSE } from '../../constants/constants';
import { prisma } from '../../database/prisma';
import { User } from '@prisma/client';

//=====================================
//        LOGIN USERS = POST
//=====================================

export const login = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).send('Unauthorized: No token provided');
    }

    if (req.user && (req.user as User).id) {
      const user = await prisma.user.findUnique({
        where: {
          id: (req.user as User).id,
        },
      });

      res.status(200).json({
        user,
        ok: true,
        message: SUCCESS_RESPONSE,
      });
    }
  } catch (error) {
    if (error) {
      console.log(error);

      return res.status(500).json({
        code: 4,
        ok: false,
        error: Error,
        message: SOMETHING_IS_WRONG,
      });
    }
  }
};
