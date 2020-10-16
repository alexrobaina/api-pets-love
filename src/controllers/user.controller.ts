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
  const { email, password, username } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({
        message: 'Please, Send your email and password',
      });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ status: 400, message: 'The user already exist' });
    }

    if (username) {
      // @ts-ignore
      const usernameFormated = req.body.username.replace(/ /g, '-').toLowerCase();
      req.body.username = usernameFormated;
    }

    const existUsername = await User.findOne({ username: req.body.username });

    if (existUsername) {
      return res.status(400).json({
        status: 400,
        message: 'The username already exist',
      });
    }

    const newUser = new User(req.body);
    await newUser.save();

    return res.status(201).json(newUser);
  } catch (e) {
    console.log(e.message);
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

  const user = await User.findOne({ email }).populate('image');

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
  const { password, username, _id } = req.body;

  try {
    let data: any = {};

    const pass = password;

    if (pass !== undefined) {
      const password = await bcrypt.hash(pass, 10);
      data.password = password;
    }

    Object.entries(req.body).forEach(([key, value]) => {
      if (key !== 'password' && key !== 'username') {
        data[key] = value;
      }
    });

    const user = await User.findOne({ username });

    if (user) {
      if (req.body._id == user._id) {
        data.username = username.replace(/ /g, '-').toLowerCase();
      } else {
        return res.status(400).json({
          status: 400,
          message: 'The username already exist',
        });
      }
    }

    data.username = username.replace(/ /g, '-').toLowerCase();

    const register = await User.findByIdAndUpdate({ _id }, data).populate('image');
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
    const user = await User.findOne({ _id: req.query._id })
      .populate('userImage')
      .populate('image')
      .select({
        _id: 1,
        name: 1,
        role: 1,
        phone: 1,
        email: 1,
        aboutUs: 1,
        location: 1,
        username: 1,
        textAddress: 1,
        requirementsToAdopt: 1,
      });

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

export const listUsersRole = async (req: any, res: any) => {
  try {
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

export const listUsers = async (req: any, res: any) => {
  try {
    const users: IUser[] = await User.find().populate('image').sort({
      name: 1,
    });

    res.status(200).json(users);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: 'Internal error on services list users',
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const register = await User.findByIdAndDelete({
      _id: req.query._id,
    });

    res.status(200).json(register);
  } catch (e) {
    res.status(500).send({
      message: 'An error occurred in remove pet',
    });
  }
};

export const resetPassword = async (req: any, res: any, next: any) => {
  let password;

  try {
    if (req.body.password) {
      password = await bcrypt.hash(req.body.password, 10);
    } else {
      return res.status(500).json({
        message: 'Something went wrong 🙄',
      });
    }

    const user = await User.findOneAndUpdate({ _id: req.user.id }, { password });

    return res.status(200).json({
      user,
      message: 'Password change successfull',
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: 'Something went wrong 🙄',
    });
  }
};
