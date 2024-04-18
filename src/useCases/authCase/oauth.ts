import { Response, Request } from 'express';
const { google } = require('googleapis');
import { SOMETHING_IS_WRONG, SUCCESS_RESPONSE } from '../../constants/constants';
import { config } from '../../config/config';

//=====================================
//        LOGIN USERS = POST
//=====================================

export const oauth = async (_req: Request, res: Response) => {
  try {
    const oauth2Client = new google.auth.OAuth2(
      config.google.GOOGLE_CLIENT_ID,
      config.google.GOOGLE_CLIENT_SECRET,
      config.HOST + '/api/auth/callback/google'
      );
      
      const scopes = [
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile',
      ];
      
      const url = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: scopes,
      });
      
    return res.status(200).json({
      ok: true,
      status: 200,
      error: null,
      location: url,
      message: SUCCESS_RESPONSE,
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
