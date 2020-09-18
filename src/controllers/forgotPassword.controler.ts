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

  let tokenReturn = '';

  if (register[0]) {
    tokenReturn = await createToken(register[0]._id);
  }

  const password = 'xcxmpqpsdwucvouy';

  const template = readFileSync(
    path.join(__dirname, '../emailTransporter/forgotPasswordEmail.hjs'),
    'utf-8'
  );

  const compiledTemplate = Hogan.compile(template);
  const urlResetPassword = `${server}/reset-password/${tokenReturn}`;

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: config.gmail.user,
      pass: config.gmail.pass,
    },
  });

  let mailOptions = {
    from: config.gmail.user,
    to: email,
    subject: 'Forgot password - PetsLove',
    html: compiledTemplate.render({ urlResetPassword }),
  };

  try {
    if (urlResetPassword) {
      await transporter.sendMail(mailOptions).then(response => response);
      res.status(200).send({
        message: 'Forgot password success',
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
