import { Request, Response } from 'express';
import { SUCCESS_RESPONSE, SOMETHING_IS_WRONG } from '../../constants/constants';
import { prisma } from '../../database/prisma';

//=====================================
//        READ LIST PETS = GET
//=====================================

export const getPets = async (_req: Request, res: Response) => {
  try {
    const pets = await prisma.pet.findMany({
      include: {
        shelter: {
          select: {
            username: true,
            image: true,
            email: true,
            socialMedia: true,
          },
        },
        location: true,
      },
    });

    res.status(200).json({
      pets,
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

//=====================================
//        READ ONE PET ID = GET
//=====================================

export const getPet = async (req: Request, res: Response) => {
  try {
    res.status(200).json({
      ok: true,
      message: SUCCESS_RESPONSE,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: true,
      message: SOMETHING_IS_WRONG,
      error,
    });
  }
};
