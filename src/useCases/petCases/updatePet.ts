import { Response, Request } from 'express';
import {
  NOT_FOUND_DOCUMENT,
  SOMETHING_IS_WRONG,
  SUCCESS_RESPONSE,
} from '../../constants/constants';
// import awsDeleteImage from '../../middlewares/awsDeleteImage';

//=====================================
//       UPDATE USER ID = PUT
//=====================================

export const update = async (req: Request, res: Response) => {
  try {
    res.status(200).json({
      ok: true,
      message: SUCCESS_RESPONSE,
    });
  } catch (error) {
    res.status(500).json({
      ok: true,
      message: SOMETHING_IS_WRONG,
    });
  }
};
