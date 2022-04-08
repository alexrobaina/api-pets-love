import { Response, Request } from 'express';
import { EMAIL_EXIST, SOMETHING_IS_WRONG, SUCCESS_RESPONSE } from '../../../constants/constants';
import User from '../../../database/models/user';
import { save } from '../../../repositories/userRepository';

//=====================================
//           CREATE USER = POST
//=====================================

export const create = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ status: 400, code: 3, message: EMAIL_EXIST });
    }

    await save(req.body);
    res.status(201).json({
      code: 5,
      ok: true,
      message: SUCCESS_RESPONSE,
    });
  } catch (error) {
    if (error) {
      console.log(error);

      res.status(500).json({
        code: 4,
        ok: false,
        error: Error,
        message: SOMETHING_IS_WRONG,
      });
    }
  }
};
