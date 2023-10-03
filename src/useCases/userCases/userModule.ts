import bcrypt from 'bcrypt';
import { response } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../../config/config';

type TUser = {
  id?: string;
  email: string;
};

function createToken(user: TUser) {
  return jwt.sign(user, config.JWT_SEED, {
    expiresIn: config.EXPIRES_IN,
  });
}

export { bcrypt, response, jwt, createToken };

