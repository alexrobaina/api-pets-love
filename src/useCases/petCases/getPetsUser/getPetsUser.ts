import { Request, Response } from 'express';
import Pet from '../../../database/models/pet';
import { SUCCESS_RESPONSE, SOMETHING_IS_WRONG } from '../../../constants/constants';
import {
  USER_ADOPTER_ROLE,
  USER_SHELTER_ROLE,
  USER_VET_ROLE,
} from '../../../database/models/constants/roles';

//=====================================
//        READ LIST PETS = GET
//=====================================

export const getPetsUser = async (req: Request, res: Response) => {
  let query = {};
  // @ts-ignore
  const limit: any = parseInt(req.query.limit) || 1;
  const page: any = req.query.page;
  const startIndex: number = (parseInt(page) - 1) * parseInt(limit);
  // @ts-ignore
  const userRole = req.user.role;
  // @ts-ignore
  const userId = req.user._id;
  const category = req.query.category;

  if (userRole === USER_SHELTER_ROLE) {
    query = {
      userCreator: userId,
      category,
    };
  }
  if (userRole === USER_VET_ROLE) {
    query = {
      vet: userId,
      category,
    };
  }

  if (userRole === USER_ADOPTER_ROLE) {
    query = {
      owner: userId,
    };
  }

  try {
    const pets = await Pet.find(query).skip(startIndex).limit(limit);
    const total = await Pet.find(query).countDocuments();

    res.status(200).json({
      ok: true,
      message: SUCCESS_RESPONSE,
      pets,
      total,
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
