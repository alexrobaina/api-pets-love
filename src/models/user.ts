import { model, Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
  name: string;
  role: string;
  phone: Number;
  email: string;
  terms: boolean;
  state: boolean;
  aboutUs: string;
  dateCreate: Date;
  lastname: string;
  username: string;
  password: string;
  location: object;
  firstname: string;
  textAddress: string;
  image: Array<String>;
  requirementsToAdopt: string;
  comparePassword: (password: any) => Promise<boolean>;
}

const userSchema = new Schema({
  location: {
    lat: { type: Number },
    lng: { type: Number },
  },
  password: { type: String },
  role: { type: String, required: true },
  state: { type: Boolean, default: true },
  terms: { type: Boolean, default: true },
  name: { type: String, lowercase: true },
  phone: { type: Number, required: false },
  aboutUs: { type: String, required: false },
  canTransit: { type: Boolean, default: false },
  dateCreate: { type: Date, default: Date.now },
  textAddress: { type: String, required: false },
  requirementsToAdopt: { type: String, required: false },
  image: { type: Schema.Types.ObjectId, ref: 'UserImage', default: null },
  lastname: { type: String, lowercase: true, required: true, trim: true },
  firstname: { type: String, lowercase: true, required: true, trim: true },
  username: { type: String, lowercase: true, required: false, trim: true },
  email: { type: String, unique: true, required: true, lowercase: true, trim: true },
});

userSchema.pre<IUser>('save', async function (next) {
  const user = this;

  if (user.password !== undefined && user.password !== '') {
    if (!user.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
  }

  user.name = `${user.firstname} ${user.lastname}`;

  next();
});

userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

export default model<IUser>('User', userSchema);