import { Response, Request } from 'express';
import { SOMETHING_IS_WRONG, SUCCESS_RESPONSE, EMAIL_EXIST } from '../../constants/constants';
import { prisma } from '../../database/prisma';

//=====================================
//           CREATE USER = POST
//=====================================

export const create = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user)
      return res.status(400).json({
        ok: false,
        message: EMAIL_EXIST,
      });

    res.status(201).json({
      ok: true,
      message: SUCCESS_RESPONSE,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error: Error,
      message: SOMETHING_IS_WRONG,
    });
  }
};
