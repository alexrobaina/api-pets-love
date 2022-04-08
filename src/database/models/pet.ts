import { Schema, model } from 'mongoose';
import { IPet } from './constants/interface';
import { DESCRIPTION_NOT_FOUND, IS_REQUIRED } from './constants/errors';

const petSchema = new Schema({
  location: {
    lat: { type: Number, required: false },
    lng: { type: Number, required: false },
  },
  category: { type: String, required: false },
  textAddress: { type: String, required: false },
  medicalNotes: { type: Array, required: false, default: [] },
  imageDeleted: { type: Array, required: false, default: [] },
  images: { type: Array, default: [], required: false },
  weight: { type: String, default: '0' },
  city: { type: String, lowercase: true, required: false },
  adopted: { type: Boolean, default: false, required: false },
  country: { type: String, lowercase: true, required: false },
  updatedDate: { type: Date, required: false },
  age: { type: String, required: false, lowercase: true },
  name: { type: String, required: false, lowercase: true },
  color: { type: String, required: false, lowercase: true },
  gender: { type: String, required: false, lowercase: true },
  description: { type: String, default: DESCRIPTION_NOT_FOUND, required: false },
  userVet: { type: Schema.Types.ObjectId, ref: 'User', default: null, required: false },
  userCreator: { type: Schema.Types.ObjectId, ref: 'User', default: null, required: false },
  userAdopted: { type: Schema.Types.ObjectId, ref: 'User', default: null, required: false },
  createdDate: { type: Date, required: [true, `The createdDate ${IS_REQUIRED}`] },
});

export default model<IPet>('Pet', petSchema);
