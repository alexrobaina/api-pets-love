import { Response, Request } from 'express';
const { google } = require('googleapis');
const userinfo = google.oauth2('v2').userinfo;
import { SOMETHING_IS_WRONG, SUCCESS_RESPONSE } from '../../constants/constants';
import { prisma } from '../../database/prisma';
import { config } from '../../config/config';
import { createToken } from './authModule';

export const googleAuth = async (req: Request, res: Response) => {
  try {
    const oauth2Client = new google.auth.OAuth2(
      config.google.GOOGLE_CLIENT_ID,
      config.google.GOOGLE_CLIENT_SECRET,
      config.HOST + '/api/auth/callback/google'
    );

    const { code } = req.query;

    if (!code) {
      throw new Error('No code provided');
    }

    const { tokens } = await oauth2Client.getToken(code as string);
    if (!tokens) {
      throw new Error('Failed to exchange code for tokens');
    }

    oauth2Client.setCredentials(tokens);

    const newUser = await userinfo.get({
      auth: oauth2Client,
    });

    const email: string = newUser.data.email.toLowerCase().trim();

    let [user] = await prisma.user.findMany({ where: { email } });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email: email,
          username: newUser.data.name,
          image: newUser.data.picture,
        },
      });

      const token = await createToken({ id: user.id, email: user.email });

      res.cookie('token', token, {
        httpOnly: true,
        sameSite: 'none',
      });
      
      res.redirect(config.HOST + '/dashboard');
    }

    const token = await createToken({ id: user.id, email: user.email });

    if (!res.headersSent) {
      res.cookie('token', token);

      res.redirect(config.HOST + '/dashboard');
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
