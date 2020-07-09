import { Request, Response } from 'express';
import Pet, { IPet } from '../models/pet';
import DogMedicalHistory, { IDogMedicalHistory } from '../models/dogMedicalHistory';
import CatMedicalHistory, { ICatMedicalHistory } from '../models/catMedicalHistory';

export const add = async (req: Request, res: Response) => {
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
  let data: any = {};

  Object.entries(req.body).forEach(([key, value]) => {
    if (value !== '' && value !== null) {
      if (key === 'userCreator') {
        data.userCreator = req.body.userCreator._id;
      } else if (key === 'userAdopter') {
        if (typeof value === 'string') {
          data.userAdopter = req.body.userAdopter;
        } else {
          data.userAdopter = req.body.userAdopter._id;
        }
      } else if (key === 'userTransit') {
        if (typeof value === 'string') {
          data.userTransit = req.body.userTransit;
        } else {
          data.userTransit = req.body.userTransit._id;
        }
      } else if (key === 'medicalDog') {
        data.dogMedicalHistory = req.body.medicalDog._id;
      } else if (key === 'medicalCat') {
        data.catMedicalHistory = req.body.medicalCat._id;
      } else if (key === 'image') {
        data.image = req.body.image._id;
      } else {
        data[key] = value;
      }
    }
  });

  if (req.body.category === 'dog') {
    if (req.body.medicalDog._id !== undefined) {
      await DogMedicalHistory.findOneAndUpdate(
        { _id: req.body.medicalDog._id },
        req.body.medicalDog
      );
    } else {
      const registerMedicalHistory: IDogMedicalHistory = await DogMedicalHistory.create(
        req.body.medicalDog
      );
      // @ts-ignore
      data.dogMedicalHistory = registerMedicalHistory._id;
    }
  }

  if (req.body.category === 'cat') {
    if (req.body.medicalCat._id !== undefined) {
      await CatMedicalHistory.findOneAndUpdate(
        { _id: req.body.medicalCat._id },
        req.body.medicalCat
      );
    } else {
      const registerMedicalHistory: ICatMedicalHistory = await CatMedicalHistory.create(
        req.body.medicalCat
      );
      // @ts-ignore
      data.catMedicalHistory = registerMedicalHistory._id;
    }
  }

  try {
    const register = await Pet.findOneAndUpdate({ _id: req.body._id }, data);

    res.status(200).json(register);
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: 'Error occurred in update Pet',
    });
  }
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
    const register: IPet[] = await Pet.find({ _id: req.query._id })
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
      .populate('dogMedicalHistory')
      .populate('catMedicalHistory')
      .populate('vet', { name: 1, email: 1, phone: 1 })
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
    const register: IPet[] = await Pet.find({
      adopted: true,
    })
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
    console.error(e);
    res.status(500).send({
      message: 'An error occurred on petsAdopted',
    });
  }
};

export const getPetForUser = async (req: Request, res: Response) => {
  try {
    const register: IPet[] = await Pet.find()
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

export const queryList = async (req: Request, res: Response) => {
  let query = {};

  Object.entries(req.query).forEach(([key, value]) => {
    if (value !== '' && value !== undefined) {
      if (key === 'city') {
        // @ts-ignore
        query.textAddress = new RegExp(value, 'i');
      }
      if (key === 'gender') {
        // @ts-ignore
        query.gender = value;
      }
      if (key === 'category') {
        // @ts-ignore
        query.category = value;
      }
    }
  });

  try {
    if (req.query) {
      const register: IPet[] = await Pet.find({
        $and: [query],
      })
        .populate('userCreator', { name: 1, email: 1, phone: 1 })
        .populate('image')
        .sort({ name: 1 })
        .exec();

      res.status(200).json(register);
    } else {
      const register: IPet[] = await Pet.find()
        .populate('userCreator', { name: 1, email: 1, phone: 1 })
        .populate('image')
        .sort({ name: 1 })
        .exec();

      res.status(200).json(register);
    }
  } catch (e) {
    res.status(500).send({
      message: 'An error occurred',
    });
  }
};
