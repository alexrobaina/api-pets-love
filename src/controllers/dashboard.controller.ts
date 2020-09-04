import { Request, Response } from 'express';
import Pet, { IPet } from '../models/pet';

export const getDashboard = async (req: Request, res: Response) => {
  const { _id } = req.query;

  try {
    const totalPetsAdopted: IPet[] = await Pet.find({
      adopted: true,
      // @ts-ignore
      userShelter: _id,
    });

    const totalPetsForAdoption: IPet[] = await Pet.find({
      adopted: false,
      // @ts-ignore
      userShelter: _id,
    });

    const totalVolunteersPetsCare: IPet[] = await Pet.find({
      adopted: false,
      // @ts-ignore
      userTransit: _id,
    });

    const totalVolunteersPetsOwner: IPet[] = await Pet.find({
      adopted: false,
      // @ts-ignore
      userCreator: _id,
    });

    const totalVeterinaryCared: IPet[] = await Pet.find({
      adopted: false,
      // @ts-ignore
      userVet: _id,
    });

    const totalPetsAdopter: IPet[] = await Pet.find({
      adopted: false,
      // @ts-ignore
      userVet: _id,
    });

    res.status(200).json({
      totalPetsAdopted: totalPetsAdopted.length,
      totalPetsForAdoption: totalPetsForAdoption.length,
      totalVolunteersPetsCare: totalVolunteersPetsCare.length,
      totalVolunteersPetsOwner: totalVolunteersPetsOwner.length,
      totalVeterinaryCared: totalVeterinaryCared.length,
      totalPetsAdopter: totalPetsAdopter.length,
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: 'An error occurred on getDashboard',
    });
  }
};
