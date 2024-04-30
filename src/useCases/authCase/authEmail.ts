import { Response, Request } from 'express';
import { SOMETHING_IS_WRONG, SUCCESS_RESPONSE } from '../../constants/constants';
import { prisma } from '../../database/prisma';
import { createToken } from './authModule';
import { sendAuthEmail } from '../utils/sendAuthEmail';

//=====================================
//        LOGIN USERS = POST
//=====================================

export const authEmail = async (req: Request, res: Response) => {
  const email = req.body.email.toLowerCase().trim()
  const {
    subject,
    hello,
    loginDescription,
    login,
    warning,
    thanks,
    welcome,
  } = req.body.texts;

  try {
    if (email) {
      let user = await prisma.user.findUnique({
        where: {
          email: email
        }
      });

      if (!user) {
        user = await prisma.user.create({
          data: {
            email: email,
          },
        });
      }

      const token = await createToken({ id: user.id, email });
      const texts:
        {
          subject: string;
          hello: string;
          loginDescription: string;
          login: string;
          warning: string;
          thanks: string;
          welcome: string;
        }
        = {
        subject,
        hello,
        loginDescription,
        login,
        warning,
        thanks,
        welcome,
      }
      await sendAuthEmail(user.email, token, texts);

      res.status(200).json({
        ok: true,
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
