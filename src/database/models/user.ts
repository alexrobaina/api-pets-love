import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import { ADMIN_ROLE, SUPER_ROLE, USER_ROLE } from './constants/roles';
import { IUser } from './constants/interface';
import { IS_REQUIRED } from './constants/errors';
import { SALT_BCRYPT } from './constants/saltBcrypt';

const rolesValidos = {
  values: [USER_ROLE, SUPER_ROLE, ADMIN_ROLE],
  message: 'Error, expected {PATH} is not valid.',
};

var userSchema = new Schema({
  img: { type: String, required: false },
  terms: { type: Boolean, default: true },
  state: { type: Boolean, default: true },
  phone: { type: String, required: false },
  createdDate: { type: Date, required: true },
  name: { type: String, required: false, lowercase: true },
  lastname: {
    trim: true,
    type: String,
    lowercase: true,
    required: [true, `The lastname ${IS_REQUIRED}`],
  },
  firstname: {
    trim: true,
    type: String,
    lowercase: true,
    required: [true, `The firstname ${IS_REQUIRED}`],
  },
  email: {
    trim: true,
    type: String,
    unique: true,
    lowercase: true,
    required: [true, `The email ${IS_REQUIRED}`],
  },
  role: { type: String, enum: rolesValidos, required: true, default: USER_ROLE },
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
