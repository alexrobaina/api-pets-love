import Pet from '../database/models/pet';

const petProps =
  'age name city notes gender color images country adopted category createdDate location textAddress updatedDate userCreator height description';

export const getAll = async () =>
  await Pet.find({}, petProps).populate('userCreator', { name: 1, email: 1, phone: 1, role: 1 });

export const getOne = async (_id: string) =>
  await Pet.findById({ _id }, petProps).populate('userCreator', {
    name: 1,
    email: 1,
    phone: 1,
    role: 1,
  });

export const save = async (body: any) => {
  const pet = new Pet({
    age: body.age,
    name: body.name,
    city: body.city,
    color: body.color,
    notes: body.notes,
    gender: body.gender,
    height: body.height,
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

export const getSearchFilter = async (
  query: object,
  limit: number,
  startIndex: number,
  petsAggregate: any
) => {
  const pets = await Pet.aggregate(petsAggregate)
    .match(query)
    .skip(startIndex)
    .limit(limit)
    .project({
      name: 1,
      images: 1,
      gender: 1,
      country: 1,
      category: 1,
    });

  return pets;
};
