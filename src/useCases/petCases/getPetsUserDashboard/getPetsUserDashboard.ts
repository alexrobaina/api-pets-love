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

export const getPetsUserDashboard = async (req: Request, res: Response) => {
  let query: {
    limit: number;
    page: number;
    _id?: string;
    category?: string;
    name?: string;
  } = { limit: 0, page: 0, _id: '', category: '', name: undefined };
  // @ts-ignore
  const limit: any = parseInt(req.query.limit);
  // @ts-ignore
  const page: any = parseInt(req.query.page);
  const startIndex: number = (page - 1) * limit;

  // NEED REFACTOR
  // @ts-ignore
  const userId = req.query._id;
  // @ts-ignore
  const category = req.query.category || undefined;
  // @ts-ignore
  const name = req.query.name || undefined;
  // @ts-ignore
  const adopted = req.query.adopted || undefined;
  // @ts-ignore
  const gender = req.query.gender || undefined;

  const user: any = await User.findOne({ _id: userId }, 'role');

  const userRole = user.role;

  if (userRole === USER_SHELTER_ROLE) {
    query = {
      // @ts-ignore
      userCreator: userId,
    };
  }
  if (userRole === USER_VET_ROLE) {
    query = {
      // @ts-ignore
      vet: userId,
    };
  }

  if (userRole === USER_ADOPTER_ROLE) {
    query = {
      // @ts-ignore
      userAdopted: userId,
    };
  }
  // @ts-ignore
  if (name) query.name = { $regex: new RegExp(name.toLowerCase()) };
  // @ts-ignore
  if (category) query?.category = category;
  // @ts-ignore
  if (adopted) query?.adopted = adopted;
  // @ts-ignore
  if (gender) query?.gender = gender;

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
