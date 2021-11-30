import { Request, Response } from 'express';
import { getAll, getOne } from '../../repositories/petRepository';
import Pet from '../../database/models/pet';
import { SUCCESS_RESPONSE, SOMETHING_IS_WRONG } from '../../constants/constants';

//=====================================
//        READ LIST USERS = GET
//=====================================

export const getPets = async (req: Request, res: Response) => {
  try {
    const petsDB = await getAll();

    if (!petsDB) {
      return res.status(401).json({
        ok: false,
        message: '',
      });
    }

    const total = await Pet.countDocuments();
    res.status(200).json({
      ok: true,
      total,
      petsDB,
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
//        READ ONE USER ID = GET
//=====================================

export const getPet = async (req: Request, res: Response) => {
  const { _id } = req.query;

  try {
    // @ts-ignore
    const petDB = await getOne(_id);

    if (!petDB) {
      return res.status(401).json({
        ok: false,
        message: SOMETHING_IS_WRONG,
      });
    }

    res.status(200).json({
      ok: true,
      message: SUCCESS_RESPONSE,
      petDB,
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
