import { Response, Request } from 'express';
import * as nodemailer from 'nodemailer';
import { templateForgotPassword } from '../../../templates/forgotPassword.templates';
import { createToken } from '../userModule';
import User from '../../../database/models/user';
import {
  NOT_FOUND_DOCUMENT,
  SOMETHING_IS_WRONG,
  SUCCESS_RESPONSE,
} from '../../../constants/constants';
import { ENGLISH_US, SPANISH_AR } from './langContants';

//=====================================
//        USERS FORGOT PASSWORD = POST
//=====================================

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email, lang } = req.body;
    let langSelected: { buttonText: string } = { buttonText: '' };
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ status: 400, code: 2, message: NOT_FOUND_DOCUMENT });
    }
    const token = createToken(user);

    const urlResetPassword = `${process.env.WEB_APP_URL}/reset-password/${token}`;

    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL,
        pass: process.env.PASS,
      },
    });

    if (lang === 'en-US') {
      langSelected = ENGLISH_US;
    }

    if (lang === 'es-AR') {
      langSelected = SPANISH_AR;
    }

    let mailOptions = {
      from: process,
      to: email,
      subject: 'Forgot password - PetsLove',
      html: templateForgotPassword(urlResetPassword, langSelected),
    };

    if (urlResetPassword) {
      // @ts-ignore
      await transporter.sendMail(mailOptions).then(response => response);
      return res.status(200).json({
        code: 6,
        status: 200,
        message: SUCCESS_RESPONSE,
      });
    }
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
