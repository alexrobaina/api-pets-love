import { Request, Response } from 'express';
import { SUCCESS_RESPONSE, SOMETHING_IS_WRONG } from '../../constants/constants';
import { prisma } from '../../database/prisma';

//=====================================
//        READ LIST USERS = GET
//=====================================

export const getUser = async (req: Request, res: Response) => {
  const id = req.query.id as string;

  const user = await prisma.user.findMany({
    where: {
      id,
    },

    select: {
      email: true,
      image: true,
      role: true,
      username: true,
      lastName: true,
      location: true,
      firstName: true,
      locationId: true,
      socialMedia: true,
    },
  });

  try {
    res.status(200).json({
      user,
      ok: true,
      message: SUCCESS_RESPONSE,
    });
  } catch (error) {
    if (error) {
      console.log(error);
      return res.status(500).json({
        ok: false,
        message: SOMETHING_IS_WRONG,
        error,
      });
    }
  }
};
