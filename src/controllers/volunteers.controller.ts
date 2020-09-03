import Pet, { IPet } from '../models/pet';

export const getPetsVolunteersOwner = async (req: any, res: any) => {
  const { _id, search } = req.query;
  const limit = parseInt(req.query.limit);
  const page = parseInt(req.query.page);
  const startIndex = (page - 1) * limit;

  try {
    const pets: IPet[] = await Pet.find({
      userCreator: _id,
      name: { $regex: new RegExp(search.toLowerCase()) },
    })
      .populate('image')
      .skip(startIndex)
      .limit(limit)
      .sort({ adopted: 1 })
      .exec();

    const totalPets: IPet[] = await Pet.find({
      userCreator: _id,
    });

    res.status(200).json({
      pets,
      totalPets: totalPets.length,
    });
  } catch (e) {
    console.error(e);
    res.status(500).send({
      message: 'An error occurred on pets transit',
    });
  }
};

export const getPetsAssignedVolunteer = async (req: any, res: any) => {
  const { _id, search, isAdopted } = req.query;
  const limit = parseInt(req.query.limit);
  const page = parseInt(req.query.page);
  const startIndex = (page - 1) * limit;

  try {
    const registers: IPet[] = await Pet.find({
      adopted: isAdopted,
      userTransit: _id,
      name: { $regex: new RegExp(search.toLowerCase()) },
    })
      .populate('image')
      .skip(startIndex)
      .sort({ name: 1 })
      .limit(limit)
      .exec();

    const totalRegisters: IPet[] = await Pet.find({
      adopted: isAdopted,
      userTransit: _id,
    });

    res.status(200).json({
      registers,
      totalPets: totalRegisters.length,
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: 'An error occurred on getPetsAssignedVolunteer',
    });
  }
};
