import User from '../database/models/user';

const userProps = 'email role name phone createdDate image pets';

export const getAll = async () => await User.find({}, userProps);
export const getOne = async (_id: string) => await User.findById({ _id }, userProps);

export const save = async (body: any) => {
  const user = new User({
    role: body.role,
    email: body.email,
    phone: body.phone,
    terms: body.terms,
    image: body.image,
    lastname: body.lastname,
    password: body.password,
    createdDate: new Date(),
    updatedDate: new Date(),
    firstname: body.firstname,
    name: `${body.firstname} ${body.lastname}`,
  });

  await user.save();

  return user;
};
