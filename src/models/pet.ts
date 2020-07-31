import { model, Schema, Document } from 'mongoose';

export interface IPet extends Document {
  image: Array<String>;
  update: any;
  name: string;
  city: string;
  lost: boolean;
  state: boolean;
  terms: boolean;
  gender: string;
  country: string;
  history: string;
  urgent: boolean;
  adopted: boolean;
  category: string;
  birthday: string;
  userVet: object;
  textAddress: string;
  userCreator: object;
  userShelter: object;
  userAdopter: object;
  userTransit: object;
  activityLevel: string;
  foundLocation: object;
  dogMedicalHistory: object;
  catMedicalHistory: object;
}

const petSchema = new Schema({
  foundLocation: {
    lat: { type: Number },
    lng: { type: Number },
  },
  name: { type: String },
  gender: { type: String },
  birthday: { type: Date },
  history: { type: String },
  adopted: { type: Boolean },
  category: { type: String },
  textAddress: { type: String },
  activityLevel: { type: String },
  lost: { type: Boolean, default: false },
  terms: { type: Boolean, default: true },
  state: { type: Boolean, default: true },
  city: { type: String, lowercase: true },
  update: { type: Date, default: Date.now },
  urgent: { type: Boolean, default: false },
  country: { type: String, lowercase: true },
  userVet: { type: Schema.Types.ObjectId, ref: 'User', default: null },
  image: { type: Schema.Types.ObjectId, ref: 'PetImage', default: null },
  userShelter: { type: Schema.Types.ObjectId, ref: 'User', default: null },
  userCreator: { type: Schema.Types.ObjectId, ref: 'User', default: null },
  userAdopter: { type: Schema.Types.ObjectId, ref: 'User', default: null },
  userTransit: { type: Schema.Types.ObjectId, ref: 'User', default: null },
  dogMedicalHistory: { type: Schema.Types.ObjectId, ref: 'DogMedicalHistory', default: null },
  catMedicalHistory: { type: Schema.Types.ObjectId, ref: 'CatMedicalHistory', default: null },
});

export default model<IPet>('Pet', petSchema);
