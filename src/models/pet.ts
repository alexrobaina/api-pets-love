import { model, Schema, Document } from 'mongoose';

export interface IPet extends Document {
  image: any;
  update: any;
  name: string;
  lost: boolean;
  state: boolean;
  terms: boolean;
  gender: string;
  history: string;
  urgent: boolean;
  adopted: boolean;
  category: string;
  birthday: string;
  userCreator: object;
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
  history: { type: String },
  adopted: { type: Boolean },
  category: { type: String },
  birthday: { type: Date },
  activityLevel: { type: String },
  lost: { type: Boolean, default: false },
  terms: { type: Boolean, default: true },
  state: { type: Boolean, default: true },
  update: { type: Date, default: Date.now },
  urgent: { type: Boolean, default: false },
  image: { type: Schema.Types.ObjectId, ref: 'Image' },
  userCreator: { type: Schema.Types.ObjectId, ref: 'User' },
  userAdopter: { type: Schema.Types.ObjectId, ref: 'User' },
  userTransit: { type: Schema.Types.ObjectId, ref: 'User' },
  dogMedicalHistory: { type: Schema.Types.ObjectId, ref: 'DogMedicalHistory' },
  catMedicalHistory: { type: Schema.Types.ObjectId, ref: 'CatMedicalHistory' },
});

export default model<IPet>('Pet', petSchema);
