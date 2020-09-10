import * as nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import config from '../config';
import Hogan from 'hogan.js';
import path from 'path';
import { readFileSync } from 'fs';

import User, { IUser } from '../models/user';
import dotenv from 'dotenv';

function createToken(user: IUser) {
  return jwt.sign({ id: user.id, email: user.email }, config.jwrSecret, {
    expiresIn: 86400,
  });
}

dotenv.config();

export const forgotPassword = async (req: any, res: any, next: any) => {
  const { email, server } = req.body;

  const register = await User.find({ $or: [{ email: new RegExp(email, 'i') }] }, { DateCreate: 0 });

  let tokenReturn = 'asd';

  if (register[0]) {
    tokenReturn = await createToken(register[0]._id);
  }

  const template = readFileSync(
    path.join(__dirname, '../emailTransporter/forgotPasswordEmail.hjs'),
    'utf-8'
  );
  const compiledTemplate = Hogan.compile(template);
  const urlResetPassword = `${server}/reset-password/${tokenReturn}`;

  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      type: 'OAuth2',
      user: 'app.petslove@gmail.com',
      clientId: '495233584114-1sjl5g1aubu98oqpg3v4e2qum7kp1gbr.apps.googleusercontent.com',
      clientSecret: 'pOQswL5We8dRAv8JpS4Ltbqa',
      refreshToken:
        '1//04CeXg7MwdEJ0CgYIARAAGAQSNwF-L9IrmqAbaH83G4AX1nOiY_7pGg6EXSCzVtzaZnd08Wqo_6GB_gleCcFl5MWR6FVJudqgngI',
      accessToken:
        'ya29.a0AfH6SMBB6i0dKNbWnELGIryKGvQk3qFVOBIEQk1GlePI5_ANSO5RV8pTeaVitSGvQVLmNp4oVybCdksnzzn0mlhD6eFGq4q-0iXbaaHq9w9l3ijpLZftVBPphJeK3ChtLDpVumsrN0pNM65LnMHWwjnP8DvShBYSv-QQ',
    },
  });

  //   USER=app.petslove@gmail.com
  // CLIENT_ID=495233584114-1sjl5g1aubu98oqpg3v4e2qum7kp1gbr.apps.googleusercontent.com
  // CLIENT_SECRET=pOQswL5We8dRAv8JpS4Ltbqa
  // REFRESH_TOKEN=1//04CeXg7MwdEJ0CgYIARAAGAQSNwF-L9IrmqAbaH83G4AX1nOiY_7pGg6EXSCzVtzaZnd08Wqo_6GB_gleCcFl5MWR6FVJudqgngI
  // ACCESS_TOKEN=ya29.a0AfH6SMBB6i0dKNbWnELGIryKGvQk3qFVOBIEQk1GlePI5_ANSO5RV8pTeaVitSGvQVLmNp4oVybCdksnzzn0mlhD6eFGq4q-0iXbaaHq9w9l3ijpLZftVBPphJeK3ChtLDpVumsrN0pNM65LnMHWwjnP8DvShBYSv-QQ

  let mailOptions = {
    from: process.env.USER,
    to: email,
    subject: 'Forgot password - PetsLove',
    html: compiledTemplate.render({ urlResetPassword }),
  };

  try {
    if (urlResetPassword) {
      await transporter.sendMail(mailOptions).then(response => response);
      res.status(200).send({
        message: 'Send!',
      });
      return next();
    }
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: 'An error occurred',
    });
    return next(e);
  }
};
