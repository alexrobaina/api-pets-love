import { Response, Request } from 'express';
import bcrypt from 'bcrypt';
import User from '../../../database/models/user';
import { SOMETHING_IS_WRONG, SUCCESS_RESPONSE } from '../../../constants/constants';

//=====================================
//        USERS RESET PASSWORD = POST
//=====================================

export const resetPassword = async (req: Request, res: Response) => {
  let password;
  console.log(req.body.password);

  try {
    if (req.body.password) {
      password = await bcrypt.hash(req.body.password, 10);
    } else {
      return res.status(500).json({
        code: 4,
        ok: false,
        error: Error,
        message: SOMETHING_IS_WRONG,
      });
    }
    // @ts-ignore
    await User.findOneAndUpdate({ _id: req.user._id }, { password });
    res.status(200).json({
      code: 8,
      ok: true,
      message: SUCCESS_RESPONSE,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      code: 4,
      ok: false,
      error: Error,
      message: SOMETHING_IS_WRONG,
    });
  }
};
