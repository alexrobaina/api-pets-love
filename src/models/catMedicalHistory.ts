import { model, Schema, Document } from 'mongoose';

export interface ICatMedicalHistory extends Document {
  vet: object;
  notes: string;
  lastVisitVet: any;
  isCastrated: boolean;
  distemperVaccine: boolean;
  felineFluVaccine: boolean;
  felineLeukemiaVaccine: boolean;
  felineInfectiousPeritonitisVaccine: boolean;
}

const catMedicalHistorySchema = new Schema({
  notes: { type: String },
  lastVisitVet: { type: Date },
  isCastrated: { type: Boolean, default: false },
  rabiesVaccine: { type: Boolean, default: false },
  vet: { type: Schema.Types.ObjectId, ref: 'User' },
  distemperVaccine: { type: Boolean, default: false },
  felineFluVaccine: { type: Boolean, default: false },
  felineLeukemiaVaccine: { type: Boolean, default: false },
  felineInfectiousPeritonitisVaccine: { type: Boolean, default: false },
});

export default model<ICatMedicalHistory>('CatMedicalHistory', catMedicalHistorySchema);
