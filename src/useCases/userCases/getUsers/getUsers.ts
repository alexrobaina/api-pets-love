import { Request, Response } from 'express';
import { getAll, getOne } from '../../../repositories/userRepository';
import User from '../../../database/models/user';
import { SUCCESS_RESPONSE, SOMETHING_IS_WRONG } from '../../../constants/constants';
import Pet from '../../../database/models/pet';
import { USER_SHELTER_ROLE, USER_VET_ROLE } from '../../../database/models/constants/roles';
const ObjectId = require('mongoose').Types.ObjectId;

//=====================================
//        READ LIST USERS = GET
//=====================================

export const getUsers = async (req: Request, res: Response) => {
  try {
    const usersDB = await getAll();

    if (!usersDB) {
      return res.status(401).json({
        ok: false,
        message: '',
      });
    }

    const total = await User.countDocuments();

    res.status(200).json({
      ok: true,
      total,
      usersDB,
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

export const getUser = async (req: Request, res: Response) => {
  let pets: object = {};
  const { _id } = req.query;

  try {
    // @ts-ignore
    const userDB: any = await getOne(_id);
    if (!userDB) {
      return res.status(401).json({
        ok: false,
        message: SOMETHING_IS_WRONG,
      });
    }

    res.status(200).json({
      ok: true,
      message: SUCCESS_RESPONSE,
      userDB,
      pets,
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