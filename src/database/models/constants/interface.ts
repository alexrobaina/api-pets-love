export interface IUser extends Document {
  img: string;
  name: string;
  role: string;
  email: string;
  terms: string;
  phone: string;
  state: boolean;
  password: string;
  lastname: string;
  firstname: string;
  createdDate: Date;
  isModified: (password: string) => Promise<boolean>;
  comparePassword: (password: string) => Promise<boolean>;
}
