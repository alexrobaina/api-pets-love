import { Response, Request } from 'express';
import {
  NOT_FOUND_DOCUMENT,
  SOMETHING_IS_WRONG,
  SUCCESS_RESPONSE,
} from '../../constants/constants';

//=====================================
//       DELETE USER ID = DELETE
//=====================================

const deleteUser = async (req: Request, res: Response) => {
  try {
    res.status(200).json({
      ok: true,
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
