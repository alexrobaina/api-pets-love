import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import {
  USER_ADOPTER_ROLE,
  USER_VET_ROLE,
  USER_ADMIN_ROLE,
  USER_SUPER_ROLE,
  USER_SHELTER_ROLE,
} from './constants/roles';
import { IUser } from './constants/interface';
import { IS_REQUIRED } from './constants/errors';
import { SALT_BCRYPT } from './constants/saltBcrypt';

const rolesValidos = {
  values: [USER_ADOPTER_ROLE, USER_VET_ROLE, USER_SHELTER_ROLE, USER_SUPER_ROLE, USER_ADMIN_ROLE],
  message: 'Error, expected {PATH} is not valid.',
};

var userSchema = new Schema({
  terms: { type: Boolean, default: true },
  state: { type: Boolean, default: true },
  phone: { type: String, required: false },
  createdDate: { type: Date, required: true },
  updatedDate: { type: Date, required: true },
  image: { type: Array, required: false, default: [] },
  name: { type: String, required: false, lowercase: true },
  requirementsToAdopt: { type: String, required: false },
  aboutUs: { type: String, required: false },
  textAddress: { type: String, required: false },
  location: {
    lat: { type: Number },
    lng: { type: Number },
  },
  lastname: {
    trim: true,
    type: String,
    lowercase: true,
    required: false,
  },
  firstname: {
    trim: true,
    type: String,
    lowercase: true,
    required: false,
  },
  email: {
    trim: true,
    type: String,
    unique: true,
    lowercase: true,
    required: [true, `The email ${IS_REQUIRED}`],
  },
  role: { type: String, enum: rolesValidos, required: true, default: USER_ADOPTER_ROLE },
  password: { type: String, required: [true, `The password ${IS_REQUIRED}`] },
});

userSchema.pre<IUser>('save', async function (next) {
  const user: IUser = this;

  if (user.password !== undefined && user.password !== '') {
    if (!user.isModified('password')) return next();
    const salt = await bcrypt.genSalt(SALT_BCRYPT);

    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
  }

  next();
});

userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  // @ts-ignore
  return await bcrypt.compare(password, this.password);
};

export default model<IUser>('User', userSchema);
