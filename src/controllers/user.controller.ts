import { Request, Response } from 'express';
import User, { IUser } from '../models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config';

function createToken(user: IUser) {
  return jwt.sign({ id: user.id, email: user.email }, config.jwrSecret, {
    expiresIn: 86400,
  });
}

export const signUp = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
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
  } catch (e) {
    console.error(e);
    return res.status(500);
  }
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
      user,
      token: createToken(user),
    });
  }

  return res.status(400).json({
    message: 'The email or password are incorrect',
  });
};

export const update = async (req: Request, res: Response) => {

  try {
    let data: any = {};

    const pass = req.body.password;

    if (pass !== undefined) {
      const password = await bcrypt.hash(pass, 10);
      data.password = password;
    }

    Object.entries(req.body).forEach(([key, value]) => {
      if (key !== 'password') {
        // @ts-ignore
        data[key] = value;
      }
    });

    // @ts-ignore
    const register = await User.findByIdAndUpdate({ _id: req.body._id }, data).populate('image');
    res.status(200).json(register);
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: 'Error occurred services update',
    });
  }
};

export const userId = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ _id: req.query._id }).populate('userImage').populate('image');

    if (!user) {
      res.status(404).send({
        message: 'User not found',
      });
    } else {
      res.status(200).json(user);
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: 'Internal error on services listUsersRole',
    });
  }
};

export const listUsersRole = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const users: IUser[] = await User.find({ role: req.query.role })
      .select({
        _id: 1,
        name: 1,
        role: 1,
        phone: 1,
        email: 1,
        location: 1,
        username: 1,
        textAddress: 1,
      })
      .populate('image')
      .sort({
        name: 1,
      });

    if (!users) {
      res.status(404).send({
        message: 'Not found users',
      });
    } else {
      res.status(200).json(users);
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: 'Internal error on services listUsersRole',
    });
  }
};
