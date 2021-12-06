export type TUser = {
  _id: string;
  name: string;
  role: string;
  email: string;
  comparePassword: (password: string) => boolean;
};
