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
  const compiledTemplate = Hogan.compile(`<html>
  <style type="text/css">
    @import 'https://fonts.googleapis.com/css?family=Bowlby+One+SC&display=swap&subset=latin-ext';
    @import 'https://fonts.googleapis.com/css?family=Noto+Sans+HK:400,500,700,900&display=swap';
  
  
    .primary {
      color: rgb(255, 255, 255);
      display: flex;
      background-color: #8E99F3;
      border: none;
      border-radius: 50px;
      justify-content: center;
      font-size: 14px;
      font-weight: 700;
      letter-spacing: 3px;
      height: 38px;
      text-transform: capitalize;
      width: 175px;
      transition: 0.3s;
      cursor: pointer;
    }
  
    .primary:hover {
      background-color: #5E92F3;
      transform: translateY(-0.25em);
    }
  
    .primary:hover {
      box-shadow: 0 7px 22px -2px rgba(0, 0, 0, 0.25);
    }
  
    .primary:focus {
      background-color: #5E92F3;
      transform: translateY(-0.25em);
    }
  
    .primary:focus {
      box-shadow: 0 7px 22px -2px rgba(0, 0, 0, 0.25);
    }
  </style>
  
  <body style="padding: 0; margin: 0; font-family: 'Noto Sans HK', sans-serif; font-weight: 700;">
    <div style="margin: 0 auto; padding-top: 50px;">
      <div class="app-name" style="text-align: center;font-size: 30px;padding: 30px;color: #929BE6;">Pets Love</div>
      <div style="text-align: center;">
        Reset your password
      </div>
      <div style="text-align: center; padding-top: 30px; padding-bottom: 30px; padding-left: 50px; padding-right: 50px;">
        <a href="{{urlResetPassword}}" class="primary" type="button">Change Password</a>
      </div>
    </div>
    </div>
  </body>
  
  </html>`);
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
    console.log(e);
    res.status(500).send({
      message: 'An error occurred',
    });
    return next(e);
  }
};
