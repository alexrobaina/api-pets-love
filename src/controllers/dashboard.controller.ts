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

    res.status(200).json({
      totalPetsAdopted: totalPetsAdopted.length,
      totalPetsForAdoption: totalPetsForAdoption.length,
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: 'An error occurred on getDashboard',
    });
  }
};
