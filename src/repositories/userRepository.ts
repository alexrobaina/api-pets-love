import User from '../database/models/user';

const userProps =
  'email role name phone createdDate image requirementsToAdopt aboutUs location textAddress';

const userPropsType = 'email _id';

export const getAll = async () => await User.find({}, userProps);
export const getAllUserTypeRole = async (role: string) => await User.find({ role }, userPropsType);
export const getOne = async (_id: string) => await User.findById({ _id }, userProps);

export const save = async (body: any) => {
  const user = new User({
    role: body.role,
    name: body.name,
    email: body.email,
    phone: body.phone,
    terms: body.terms,
    image: body.image,
    lastname: body.lastname,
    password: body.password,
    createdDate: new Date(),
    updatedDate: new Date(),
    firstname: body.firstname,
  });

  await user.save();

  return user;
};
