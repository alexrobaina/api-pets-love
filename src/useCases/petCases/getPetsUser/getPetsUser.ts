import { Request, Response } from 'express';
import Pet from '../../../database/models/pet';
import { SUCCESS_RESPONSE, SOMETHING_IS_WRONG } from '../../../constants/constants';
import {
  USER_ADOPTER_ROLE,
  USER_SHELTER_ROLE,
  USER_VET_ROLE,
} from '../../../database/models/constants/roles';
import User from '../../../database/models/user';

//=====================================
//        READ LIST PETS = GET
//=====================================

export const getPetsUser = async (req: Request, res: Response) => {
  let query = {};
  // @ts-ignore
  const limit: any = parseInt(req.query?.limit);
  // @ts-ignore
  const page: any = parseInt(req.query?.page);
  const startIndex: number = (page - 1) * limit;
  console.log('startIndex', startIndex);
  console.log('page', page);
  console.log('limit', limit);
  // @ts-ignore
  const userId = req.query._id;
  const category = req.query.category;

  const user: any = await User.findOne({ _id: userId }, 'role');

  const userRole = user.role;

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
