import User from '../database/models/user';

const userProps = 'email role name firstname lastname';

export const getAll = async () => await User.find({}, userProps);
export const getOne = async (_id: string) => await User.findById({ _id }, userProps);

export const save = async (body: any) => {
  console.log(4, body.password);
  const user = new User({
    img: body.img,
    role: body.role,
    email: body.email,
    phone: body.phone,
    terms: body.terms,
    lastname: body.lastname,
    password: body.password,
    createdDate: new Date(),
    firstname: body.firstname,
    name: `${body.firstname} ${body.lastname}`,
  });

  await user.save();

  return user;
};
