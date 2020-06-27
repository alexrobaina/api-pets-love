import { Request, Response } from 'express';
import Pet, { IPet } from '../models/pet';
import DogMedicalHistory, { IDogMedicalHistory } from '../models/dogMedicalHistory';
import CatMedicalHistory, { ICatMedicalHistory } from '../models/catMedicalHistory';

export let add: (req: Request, res: Response) => Promise<void>;
add = async (req: Request, res: Response) => {
  try {
    const register = await Pet.create(req.body);

    if (register.category === 'dog') {
      const registerMedicalHistory: IDogMedicalHistory = await DogMedicalHistory.create(
        req.body.medicalDog
      );
      register.dogMedicalHistory = registerMedicalHistory._id;
    }

    if (register.category === 'cat') {
      const registerMedicalHistory: ICatMedicalHistory = await CatMedicalHistory.create(
        req.body.medicalCat
      );
      register.catMedicalHistory = registerMedicalHistory._id;
    }

    await register.save();

    res.status(200).json(register);
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: 'Error occurred in create pet',
    });
  }
};

export const updatePet = async (req: Request, res: Response) => {
  console.log(req.body);
  // try {
  //   const register = await Pet.create(req.body);
  //
  //   await register.save();
  //
  //   res.status(200).json(register);
  // } catch (e) {
  //   console.log(e);
  //   res.status(500).send({
  //     message: 'Error occurred in create pet',
  //   });
  // }
};

export const listPets = async (req: Request, res: Response) => {
  try {
    const register: IPet[] = await Pet.find()
      .populate('userCreator', { name: 1, email: 1, phone: 1, role: 1 })
      .populate('userAdopter', { name: 1, email: 1, phone: 1 })
      .populate('userTransit', { name: 1, email: 1, phone: 1 })
      .populate('dogMedicalHistory')
      .populate('catMedicalHistory')
      .populate('image')
      .sort({ name: 1 })
      .exec();

    res.status(200).json(register);
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: 'An error occurred on List pets',
    });
  }
};

export const getOnePet = async (req: Request, res: Response) => {
  try {
    const register = await Pet.findOne(req.body.id)
      .populate('userCreator', { name: 1, email: 1, phone: 1, role: 1 })
      .populate('userAdopter', { name: 1, email: 1, phone: 1 })
      .populate('userTransit', { name: 1, email: 1, phone: 1 })
      .populate('dogMedicalHistory')
      .populate('catMedicalHistory')
      .populate('image')
      .sort({ name: 1 })
      .exec();

    res.status(200).json(register);
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: 'An error occurred on get one pet',
    });
  }
};

export const pet = async (req: Request, res: Response) => {
  try {
    const register: IPet[] = await Pet.find({ _id: req.query._id })
      .populate('userCreator', { name: 1, email: 1, phone: 1, role: 1 })
      .populate('userAdopter', { name: 1, email: 1, phone: 1 })
      .populate('userTransit', { name: 1, email: 1, phone: 1 })
      .populate('vet', { name: 1, email: 1, phone: 1 })
      .populate('dogMedicalHistory')
      .populate('catMedicalHistory')
      .populate('image')
      .sort({ name: 1 })
      .exec();

    res.status(200).json(register);
  } catch (e) {
    res.status(500).send({
      message: 'An error occurred on petsForAdoption',
    });
  }
};

export const petsForAdoption = async (req: Request, res: Response) => {
  try {
    const register: IPet[] = await Pet.find({
      adopted: false,
    })
      .populate('userCreator', { name: 1, email: 1, phone: 1 })
      .populate('userAdopter', { name: 1, email: 1, phone: 1 })
      .populate('userTransit', { name: 1, email: 1, phone: 1 })
      .populate('vet', { name: 1, email: 1, phone: 1 })
      .populate('dogMedicalHistory')
      .populate('catMedicalHistory')
      .populate('image')
      .sort({ name: 1 })
      .exec();

    const pets = register.filter(pet => {
      if (pet.userCreator) {
        // @ts-ignore
        return pet.userCreator._id == req.query._id;
      }
    });

    res.status(200).json(pets);
  } catch (e) {
    res.status(500).send({
      message: 'An error occurred on petsForAdoption',
    });
  }
};

export const petsAdopted = async (req: Request, res: Response) => {
  try {
    const register: IPet[] = await Pet.find({ adopted: true })
      .populate('userCreator', { name: 1, email: 1, phone: 1, role: 1 })
      .populate('userAdopter', { name: 1, email: 1, phone: 1 })
      .populate('userTransit', { name: 1, email: 1, phone: 1 })
      .populate('vet', { name: 1, email: 1, phone: 1 })
      .populate('dogMedicalHistory')
      .populate('catMedicalHistory')
      .populate('image')

      .sort({ name: 1 })
      .exec();

    const pets = register.filter(pet => {
      if (pet.userCreator) {
        // @ts-ignore
        return pet.userCreator._id == req.query._id;
      }
    });

    res.status(200).json(pets);
  } catch (e) {
    res.status(500).send({
      message: 'An error occurred on petsAdopted',
    });
  }
};

export const getPetForUser = async (req: Request, res: Response) => {
  try {
    const register = await Pet.find()
      .populate('userCreator', { name: 1, email: 1, phone: 1 })
      .populate('userAdopter', { name: 1, email: 1, phone: 1 })
      .populate('userTransit', { name: 1, email: 1, phone: 1 })
      .populate('vet', { name: 1, email: 1, phone: 1 })
      .populate('dogMedicalHistory')
      .populate('catMedicalHistory')
      .populate('image')
      .sort({ name: 1 })
      .exec();

    const pets = register.filter(pet => {
      if (pet.userCreator) {
        // @ts-ignore
        return pet.userCreator._id == req.query._id;
      }
    });

    res.status(200).json(pets);
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: 'An error occurred',
    });
  }
};
