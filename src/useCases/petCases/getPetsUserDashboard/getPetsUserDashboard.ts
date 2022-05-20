import { Request, Response } from 'express';
import Pet from '../../../database/models/pet';
import { SUCCESS_RESPONSE, SOMETHING_IS_WRONG } from '../../../constants/constants';
import {
  USER_ADOPTER_ROLE,
  USER_SHELTER_ROLE,
  USER_VET_ROLE,
} from '../../../database/models/constants/roles';
import User from '../../../database/models/user';
import { IPet } from '../../../database/models/constants/interface';

//=====================================
//        READ LIST PETS = GET
//=====================================

export const getPetsUserDashboard = async (
  req: Request<{ category: string; name: string }>,
  res: Response
) => {
  let query: any = {};
  // @ts-ignore
  const limit: any = parseInt(req.query.limit);
  // @ts-ignore
  const page: any = parseInt(req.query.page);
  const startIndex: number = (page - 1) * limit;

  // NEED REFACTOR
  // @ts-ignore
  const userId = req.query._id;
  const category = req.query?.category || undefined;
  const name = req.query?.name || undefined;
  const adopted = req.query?.adopted || undefined;
  const gender = req.query?.gender || undefined;

  const user: any = await User.findOne({ _id: userId }, 'role');

  const userRole = user.role;
  let petsUserVetCreator: any;
  let petsUserVetAsigned: any;
  let pets: any = [];

  // @ts-ignore
  if (name) query.name = { $regex: new RegExp(name.toLowerCase()) };

  // @ts-ignore
  if (category) query.category = category;

  // @ts-ignore
  if (gender) query.gender = gender;

  if (userRole === USER_SHELTER_ROLE) {
    // @ts-ignore
    query.userCreator = userId;
    // @ts-ignore
    query.adopted = adopted;
  }

  if (userRole === USER_VET_ROLE) {
    // @ts-ignore
    petsUserVetCreator = await Pet.find({ ...query, userCreator: userId })
      .skip(startIndex)
      .limit(limit);
    // @ts-ignore
    petsUserVetAsigned = await Pet.find({ ...query, userVet: userId })
      .skip(startIndex)
      .limit(limit);

    if (petsUserVetCreator !== []) {
      petsUserVetCreator.forEach((pet: IPet) => {
        pets.push(pet);
      });
    }

    if (petsUserVetAsigned.length !== []) {
      petsUserVetAsigned.forEach((pet: IPet) => {
        pets.push(pet);
      });
    }

    const uniqueIds = new Set();

    const petsFiltered = pets.filter((pet: any) => {
      const isDuplicate = uniqueIds.has(pet.id);

      uniqueIds.add(pet.id);
      if (!isDuplicate) {
        return true;
      }

      return false;
    });

    return res.status(200).json({
      ok: true,
      message: SUCCESS_RESPONSE,
      pets: petsFiltered,
      total: petsFiltered.length,
    });
  }

  if (userRole === USER_ADOPTER_ROLE) {
    // @ts-ignore
    query.userAdopted = userId;
    // @ts-ignore
    query.adopted = true;
  }

  try {
    // @ts-ignore
    const queryPetsResponse = await Pet.find(query).skip(startIndex).limit(limit);
    if (queryPetsResponse !== []) {
      queryPetsResponse.forEach((pet: IPet) => {
        pets.push(pet);
      });
    }

    // @ts-ignore
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
