import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import config from '../config';
import Hogan from 'hogan.js';
import { readFileSync } from 'fs';
import * as path from 'path';
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

  let tokenReturn;

  if (register[0]._id) {
    tokenReturn = await createToken(register[0]);
  }

  const template = readFileSync('./emailTransporter/forgotPasswordEmail.hjs', 'utf-8');
  console.log(template);
  const compiledTemplate = Hogan.compile(template);
  const urlResetPassword = `${server}/reset-password/${tokenReturn}`;

  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      type: 'OAuth2',
      user: process.env.USER,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
      accessToken: process.env.ACCESS_TOKEN,
    },
  });

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
    res.status(500).send({
      message: 'An error occurred',
    });
    return next(e);
  }
};
