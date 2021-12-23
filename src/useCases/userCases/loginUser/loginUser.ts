import { Response, Request } from 'express';
import { createToken } from '../userModule';
import User from '../../../database/models/user';
import {
  NOT_FOUND_DOCUMENT,
  EMAIL_PASSWORD_INVALID,
  CREDENTIAL_ERROR,
  SOMETHING_IS_WRONG,
} from '../../../constants/constants';

//=====================================
//        LOGIN USERS = POST
//=====================================

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: EMAIL_PASSWORD_INVALID,
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ status: 400, code: 2, message: NOT_FOUND_DOCUMENT });
    }

    const isMath = await user.comparePassword(password);
    user.password = `🙈`;

    if (isMath) {
      return res.status(200).json({
        user,
        status: 200,
        token: createToken(user),
      });
    }

    return res.status(400).json({
      code: 1,
      status: 400,
      message: CREDENTIAL_ERROR,
    });
  } catch (error) {
    if (error) {
      console.log(error);

      return res.status(500).json({
        code: 4,
        ok: false,
        error: Error,
        message: SOMETHING_IS_WRONG,
      });
    }
  }
};
