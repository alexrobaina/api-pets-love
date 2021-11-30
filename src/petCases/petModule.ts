import bcrypt from 'bcrypt';
import { config } from '../config/config';
import { response } from 'express';
import jwt from 'jsonwebtoken';
import { TUser } from './types';

function createToken(user: TUser) {
  const { _id, email, name, role } = user;

  return jwt.sign({ _id, email, name, role }, config.SEED, {
    expiresIn: config.EXPIRES_IN || 86400,
  });
}

export { bcrypt, response, jwt, createToken };
