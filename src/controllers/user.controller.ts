import { Request, Response } from 'express';
import User, { IUser } from '../models/user';
import jwt from 'jsonwebtoken';
import config from '../config';

function createToken(user: IUser) {
  return jwt.sign({ id: user.id, email: user.email }, config.jwrSecret, {
    expiresIn: 86400,
  });
}

export const signUp = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: 'Please, Send your email and password',
    });
  }

  const user = await User.findOne({ email });

  if (user) {
    return res.status(400).json({ message: 'The user already exist' });
  }

  const newUser = new User(req.body);
  await newUser.save();

  return res.status(201).json(newUser);
};

export const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: 'Please, Send your email and password',
    });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: 'the user does not exist' });
  }

  const isMath = await user.comparePassword(password);

  if (isMath) {
    return res.status(200).json({
      user: {
        _id: user._id,
        name: user.email,
      },
      token: createToken(user),
    });
  }

  return res.status(400).json({
    message: 'The email or password are incorrect',
  });
};
