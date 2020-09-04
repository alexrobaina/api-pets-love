import Pet, { IPet } from '../models/pet';

export const listPetsVeterinaryCared = async (req: any, res: any) => {
  const { _id, search } = req.query;
  const limit = parseInt(req.query.limit);
  const page = parseInt(req.query.page);
  const startIndex = (page - 1) * limit;

  try {
    const registers: IPet[] = await Pet.find({
      userVet: _id,
      name: { $regex: new RegExp(search.toLowerCase()) },
    })
      .populate('image')
      .skip(startIndex)
      .limit(limit)
      .sort({ adopted: 1 })
      .exec();

    const totalPets: IPet[] = await Pet.find({
      userVet: _id,
    });

    res.status(200).json({
      registers,
      totalPets: totalPets.length,
    });
  } catch (e) {
    console.error(e);
    res.status(500).send({
      message: 'An error occurred on pets transit',
    });
  }
};
