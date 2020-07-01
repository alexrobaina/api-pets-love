import { model, Schema, Document } from 'mongoose';

export interface IDogMedicalHistory extends Document {
  notes: string;
  lastVisitVet: any;
  isCastrated: boolean;
  rabiesVaccine: boolean;
  hepatitisVaccine: boolean;
  distemperVaccine: boolean;
  parvovirusVaccine: boolean;
  leptospirosisVaccine: boolean;
  parainfluenzaVaccine: boolean;
  bordetellaBronchisepticVaccine: boolean;
}

const dogMedicalHistorySchema = new Schema({
  notes: { type: String },
  lastVisitVet: { type: Date },
  isCastrated: { type: Boolean, default: false },
  rabiesVaccine: { type: Boolean, default: false },
  distemperVaccine: { type: Boolean, default: false },
  hepatitisVaccine: { type: Boolean, default: false },
  parvovirusVaccine: { type: Boolean, default: false },
  leptospirosisVaccine: { type: Boolean, default: false },
  parainfluenzaVaccine: { type: Boolean, default: false },
  bordetellaBronchisepticVaccine: { type: Boolean, default: false },
});

export default model<IDogMedicalHistory>('DogMedicalHistory', dogMedicalHistorySchema);
