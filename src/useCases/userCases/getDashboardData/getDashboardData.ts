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

export const getDashboardData = async (req: Request, res: Response) => {
  // [] Mis perros
  // [] Mis mis gatos
  // [] Mis mis exotico
  // [] Filtrar por adoptados
  // [] Filtrar por no adoptados

  let query: any = {};
  const userId = req.query._id;

  const user: any = await User.findOne({ _id: userId }, 'role');

  const userRole = user.role;

  if (userRole === USER_SHELTER_ROLE) {
    query = {
      userCreator: userId,
    };
  }

  if (userRole === USER_VET_ROLE) {
    query = {
      vet: userId,
    };
  }

  if (userRole === USER_ADOPTER_ROLE) {
    query = {
      owner: userId,
    };
  }

  try {
    query.adopted = true;
    const adopted = await Pet.find(query).countDocuments();
    query.adopted = false;
    const adoption = await Pet.find(query).countDocuments();
    query.category = 'cat';
    const cats = await Pet.find(query).countDocuments();
    query.category = 'dog';
    const dogs = await Pet.find(query).countDocuments();
    query.category = 'exotic';
    const exotics = await Pet.find(query).countDocuments();

    res.status(200).json({
      cats,
      dogs,
      adopted,
      exotics,
      adoption,
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
