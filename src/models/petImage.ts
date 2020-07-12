import { model, Schema, Document } from 'mongoose';

export interface IPetImage extends Document {
  filenames: Array<String>;
}

const petImageSchema = new Schema({
  filenames: [String],
});

export default model<IPetImage>('PetImage', petImageSchema);
