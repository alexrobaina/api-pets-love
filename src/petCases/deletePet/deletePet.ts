import { Response, Request } from 'express';
import Pet from '../../database/models/pet';
import {
  NOT_FOUND_DOCUMENT,
  SOMETHING_IS_WRONG,
  SUCCESS_RESPONSE,
} from '../../constants/constants';

//=====================================
//       DELETE USER ID = DELETE
//=====================================

const deleteUser = async (req: Request, res: Response) => {
  const _id = req.query._id;

  try {
    const petDB = await Pet.findById(_id);

    if (!petDB) {
      return res.status(401).json({
        ok: false,
        message: NOT_FOUND_DOCUMENT,
      });
    }

    const userDeleted = await Pet.findByIdAndRemove(petDB._id);

    res.status(200).json({
      ok: true,
      userDeleted,
      message: SUCCESS_RESPONSE,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error,
      ok: true,
      message: SOMETHING_IS_WRONG,
    });
  }
};

export default deleteUser;
