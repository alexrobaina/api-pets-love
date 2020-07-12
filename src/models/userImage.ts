import { model, Schema, Document } from 'mongoose';

export interface IUserImage extends Document {
  filenames: Array<String>;
}

const userImageSchema = new Schema({
  filenames: [String],
});

export default model<IUserImage>('UserImage', userImageSchema);
