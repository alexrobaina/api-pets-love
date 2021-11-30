import Pet from '../database/models/pet';

const petProps =
  'age name city notes gender images country adopted category createdDate location textAddress updatedDate userCreator';

export const getAll = async () =>
  await Pet.find({}, petProps)
    .populate('userVet', { name: 1, email: 1, phone: 1 })
    .populate('userAdopter', { name: 1, email: 1, phone: 1 })
    .populate('userShelter', { name: 1, email: 1, phone: 1 })
    .populate('userCreator', { name: 1, email: 1, phone: 1, role: 1 });
export const getOne = async (_id: string) => await Pet.findById({ _id }, petProps);

export const save = async (body: any) => {
  const pet = new Pet({
    age: body.age,
    name: body.name,
    city: body.city,
    notes: body.notes,
    gender: body.gender,
    images: body.images,
    country: body.country,
    adopted: body.adopted,
    category: body.category,
    updatedDate: new Date(),
    createdDate: new Date(),
    description: body.category,
    textAddress: body.textAddress,
    userCreator: body.userCreator,
    location: {
      lat: body.lat,
      long: body.long,
    },
  });

  await pet.save();

  return pet;
};
