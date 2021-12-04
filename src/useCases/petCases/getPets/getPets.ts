import { Request, Response } from 'express';
import { getAll, getOne, getSearchFilter } from '../../../repositories/petRepository';
import Pet from '../../../database/models/pet';
import { SUCCESS_RESPONSE, SOMETHING_IS_WRONG } from '../../../constants/constants';
import { USER_SHELTER_ROLE } from '../../../database/models/constants/roles';

//=====================================
//        READ LIST PETS = GET
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
//        READ ONE PET ID = GET
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

export const getSearchFilterPets = async (req: Request, res: Response) => {
  const limit: any = req.query?.limit;
  const page: any = req.query?.page;
  const startIndex: number = (parseInt(page) - 1) * parseInt(limit);

  let query = {
    adopted: false,
    'userCreator.role': USER_SHELTER_ROLE,
  };

  const petsAggregate = [
    {
      $lookup: {
        from: 'users',
        localField: 'userCreator',
        foreignField: '_id',
        as: 'userCreator',
      },
    },
    { $unwind: '$userCreator' },
  ];

  Object.entries(req.query).forEach(([key, value]) => {
    if (value !== '' && value !== undefined) {
      if (key === 'country') {
        // @ts-ignore
        query.country = new RegExp(value, 'i');
      }
      // @ts-ignore
      if (key === 'city') {
        // @ts-ignore
        query.city = new RegExp(value, 'i');
      }
      if (key === 'gender') {
        // @ts-ignore
        query.gender = value;
      }
      if (key === 'category') {
        // @ts-ignore
        query.category = value;
      }
    }
  });

  try {
    const petsDB = await getSearchFilter(query, parseInt(limit), startIndex, petsAggregate);

    const total = petsDB.length;

    if (!petsDB) {
      return res.status(401).json({
        ok: true,
        total,
        petsDB,
        message: SUCCESS_RESPONSE,
      });
    }

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
