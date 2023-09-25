import e, { Request, Response } from 'express';
import { SUCCESS_RESPONSE, SOMETHING_IS_WRONG } from '../../constants/constants';
import { prisma } from '../../database/prisma';

//=====================================
//        READ LIST USERS = GET
//=====================================

export const updateUser = async (req: Request, res: Response) => {
  let location: any;
  if (!req.body.id) {
    return res.status(400).json({
      ok: false,
      message: 'No se ha enviado el id del usuario',
    });
  }
  if (req.body.locationId !== '') {
    location = await prisma.location.update({
      where: {
        id: req.body.locationId,
      },
      data: req.body.location,
    });
  } else {
    location = await prisma.location.create({
      data: req.body.location,
    });
  }

  const data = await removeEmptyAndLocation(req.body);

  const users = await prisma.user.update({
    where: {
      id: req.body.id,
    },
    data: {
      ...data,
      locationId: location.id,
    },
  });

  try {
    res.status(200).json({
      users,
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

const removeEmptyAndLocation = (obj: Record<string, any>): Record<string, any> => {
  const newObj: Record<string, any> = {};

  for (const [key, value] of Object.entries(obj)) {
    if (key === 'location') continue; // Si la clave es 'location', la omitimos.

    if (value !== null && value !== undefined && value !== '') {
      if (typeof value === 'object' && !Array.isArray(value)) {
        const nestedObj = removeEmptyAndLocation(value); // Asegurándonos de que también verificamos los objetos anidados
        if (Object.keys(nestedObj).length > 0) {
          newObj[key] = nestedObj;
        }
      } else {
        newObj[key] = value;
      }
    }
  }

  return newObj;
};
