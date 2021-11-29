import { Response, Request } from 'express';
import { SOMETHING_IS_WRONG, SUCCESS_RESPONSE } from '../../constants/constants';
import { save } from '../../repositories/userRepository';

//=====================================
//           CREATE USER = POST
//=====================================

export const createUser = async (req: Request, res: Response) => {
  try {
    await save(req.body);
    res.status(201).json({
      ok: true,
      message: SUCCESS_RESPONSE,
    });
  } catch (error) {
    if (error) {
      console.log(error);

      return res.status(500).json({
        ok: false,
        error: Error,
        message: SOMETHING_IS_WRONG,
      });
    }
  }
};

export default createUser;
