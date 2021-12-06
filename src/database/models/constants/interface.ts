export interface IUser extends Document {
  image: [];
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

export interface IPet extends Document {
  age: string;
  vet: object;
  name: string;
  city: string;
  owner: object;
  gender: string;
  country: string;
  category: string;
  adopted: boolean;
  createdDate: Date;
  updatedDate: Date;
  locations: object;
  textAddress: string;
  userCreator: object;
  userShelter: object;
  userAdopter: object;
  notes: Array<object>;
  images: HTMLCollectionOf<HTMLImageElement>;
}
