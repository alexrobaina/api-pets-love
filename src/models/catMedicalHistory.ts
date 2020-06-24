import { model, Schema, Document } from 'mongoose';

export interface ICatMedicalHistory extends Document {
  notes: string;
  lastVisitVet: string;
  distemperVaccine: boolean;
  felineFluVaccine: boolean;
  felineLeukemiaVaccine: boolean;
  felineInfectiousPeritonitisVaccine: boolean;
}

const catMedicalHistorySchema = new Schema({
  notes: { type: String },
  lastVisitVet: { type: String },
  rabiesVaccine: { type: Boolean, default: false },
  distemperVaccine: { type: Boolean, default: false },
  felineFluVaccine: { type: Boolean, default: false },
  felineLeukemiaVaccine: { type: Boolean, default: false },
  felineInfectiousPeritonitisVaccine: { type: Boolean, default: false },
});

export default model<ICatMedicalHistory>('CatMedicalHistory', catMedicalHistorySchema);
