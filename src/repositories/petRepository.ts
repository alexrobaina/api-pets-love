import Pet from '../database/models/pet';

const petProps =
  'age name city medicalNotes gender color images country adopted category createdDate location textAddress updatedDate userCreator W description vet userAdopted';

export const getAll = async () =>
  await Pet.find({}, petProps).populate('userCreator', { name: 1, email: 1, phone: 1, role: 1 });

export const getOne = async (_id: string) =>
  await Pet.findById({ _id }, petProps).populate('userCreator', {
    name: 1,
    email: 1,
    phone: 1,
    role: 1,
  });

export const save = async (body: any, userId: string, images: Array<String>) => {
  const pet = new Pet({
    images,
    age: body.age,
    name: body.name,
    city: body.city,
    color: body.color,
    gender: body.gender,
    weight: body.weight,
    country: body.country || '',
    adopted: body.adopted,
    category: body.category,
    updatedDate: new Date(),
    createdDate: new Date(),
    description: body.description,
    textAddress: body?.textAddress || '',
    userCreator: userId,
    medicalNotes: body.medicalNotes,
    location: {
      lat: body?.location?.lat || '',
      lng: body?.location?.lng || '',
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
  const total = await Pet.aggregate(petsAggregate).match(query);
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

  return { pets, total: total.length };
};
