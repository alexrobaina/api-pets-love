import Pet, { IPet } from '../models/pet';
import mongoose from 'mongoose';

export const getPetAdopter = async (req: any, res: any) => {
  const { _id } = req.query;
  const limit = parseInt(req.query.limit);
  const page = parseInt(req.query.page);
  const startIndex = (page - 1) * limit;

  const petsAggregate = [
    {
      $match: {
        userAdopter: new mongoose.Types.ObjectId(_id),
      },
    },
    {
      $lookup: {
        from: 'users',
        localField: 'userCreator',
        foreignField: '_id',
        as: 'userCreator',
      },
    },
    { $unwind: '$userCreator' },
    {
      $lookup: {
        from: 'users',
        localField: 'userAdopter',
        foreignField: '_id',
        as: 'userAdopter',
      },
    },
    { $unwind: '$userAdopter' },
    {
      $lookup: {
        from: 'petimages',
        localField: 'image',
        foreignField: '_id',
        as: 'image',
      },
    },
    { $unwind: '$image' },
  ];

  try {
    const registers: IPet[] = await Pet.aggregate(petsAggregate)
      .skip(startIndex)
      .limit(limit)
      .project({
        name: 1,
        image: 1,
        urgent: 1,
        gender: 1,
        country: 1,
        history: 1,
        category: 1,
        userAdopter: 1,
        userCreator: 1,
      });

    const totalCount: IPet[] = await Pet.aggregate(petsAggregate);

    res.status(200).json({
      registers,
      totalPets: totalCount.length,
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: 'An error occurred',
    });
  }
};
