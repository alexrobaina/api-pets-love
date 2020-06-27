import { model, Schema, Document } from 'mongoose';

export interface IImage extends Document {
  filenames: Array<String>;
}

const imageSchema = new Schema({
  filenames: [String],
});

export default model<IImage>('Image', imageSchema);
