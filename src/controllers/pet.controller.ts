import { Request, Response } from 'express';
import Pet, { IPet } from '../models/pet';
import _ from 'lodash';
import PetImage from '../models/petImage';
import config from '../config/config';
import DogMedicalHistory, { IDogMedicalHistory } from '../models/dogMedicalHistory';
import CatMedicalHistory, { ICatMedicalHistory } from '../models/catMedicalHistory';
import deleteImage from '../services/delete-files-aws';

export const create = async (req: Request, res: Response) => {
  try {
    const register = await Pet.create(req.body);

    await register.save();

    res.status(200).json(register);
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: 'Error occurred in create pet',
    });
  }
};

export const deletePet = async (req: Request, res: Response) => {
  try {
    const register = await Pet.find({
      _id: req.query._id,
    });

    if (register[0].image) {
      const images = await PetImage.find({
        _id: register[0].image,
      });

      // @ts-ignore
      if (deleteImage(images[0].filenames, config.awsConfig.PET_BUCKET_FOLDER)) {
        await PetImage.findByIdAndDelete({
          _id: register[0].image,
        });
      } else {
        return res.status(500).send({
          message: 'Something is wrong in delete image',
        });
      }
    }

    await Pet.findByIdAndDelete({ _id: req.query._id });

    // @ts-ignore
    if (register.category === 'dog') {
      // @ts-ignore
      await DogMedicalHistory.findByIdAndDelete(register.dogMedicalHistory);
    }

    // @ts-ignore
    console.log(register.dogMedicalHistory);

    // @ts-ignore
    if (register.category === 'cat') {
      // @ts-ignore
      await CatMedicalHistory.findByIdAndDelete(register.catMedicalHistory);
    }

    res.status(200).send({
      message: 'Delete pet success',
    });
  } catch (e) {
    res.status(500).send({
      message: 'An error occurred in remove pet',
    });
  }
};

export const updatePet = async (req: any, res: any) => {
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
    } else if (key === 'birthday' && value === null) {
      data.birthday = null;
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
      .populate('userShelter', { name: 1, email: 1, phone: 1 })
      .populate('userVet', { name: 1, email: 1, phone: 1 })
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
      .populate('userShelter', { name: 1, email: 1, phone: 1 })
      .populate('userVet', { name: 1, email: 1, phone: 1 })
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
      .populate('userShelter', { name: 1, email: 1, phone: 1 })
      .populate('userVet', { name: 1, email: 1, phone: 1 })
      .populate('dogMedicalHistory')
      .populate('catMedicalHistory')
      .populate('image')
      .sort({ name: 1 })
      .exec();

    res.status(200).json(register);
  } catch (e) {
    res.status(500).send({
      message: 'An error occurred on pets',
    });
  }
};

export const petsShelter = async (req: any, res: any) => {
  const { _id, search, isAdopted } = req.query;
  const limit = parseInt(req.query.limit);
  const page = parseInt(req.query.page);
  const startIndex = (page - 1) * limit;

  const formatIsAdopted = isAdopted == 'true';

  let petsSearch = {
    adopted: formatIsAdopted,
    userCreator: _id,
  };

  if (search) {
    // @ts-ignore
    petsSearch.name = { $regex: new RegExp(search.toLowerCase()) };
  }

  try {
    const registers: IPet[] = await Pet.find(petsSearch)
      .populate('image')
      .skip(startIndex)
      .limit(limit)
      .exec();

    const totalRegisters: IPet[] = await Pet.find({
      adopted: isAdopted,
      userCreator: _id,
    });

    res.status(200).json({
      registers,
      totalPets: totalRegisters.length,
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: 'An error occurred on petsShelter',
    });
  }
};

export const petsAdopted = async (req: any, res: any) => {
  const { _id, search } = req.query;
  const limit = parseInt(req.query.limit);
  const page = parseInt(req.query.page);
  const startIndex = (page - 1) * limit;

  try {
    const registers: IPet[] = await Pet.find({
      adopted: true,
      userCreator: _id,
      name: { $regex: new RegExp(search.toLowerCase()) },
    })
      .populate('image')
      .skip(startIndex)
      .limit(limit)
      .sort({ name: 1 })
      .exec();

    const totalRegisters: IPet[] = await Pet.find({
      adopted: true,
      userCreator: _id,
    });

    res.status(200).json({
      registers,
      totalPets: totalRegisters.length,
    });
  } catch (e) {
    console.error(e);
    res.status(500).send({
      message: 'An error occurred on petsAdopted',
    });
  }
};

export const getPetForUser = async (req: any, res: any) => {
  try {
    const pets: IPet[] = await Pet.find({ userCreator: req.query._id })
      .populate('userCreator', { name: 1, email: 1, phone: 1 })
      .populate('userAdopter', { name: 1, email: 1, phone: 1 })
      .populate('userTransit', { name: 1, email: 1, phone: 1 })
      .populate('userShelter', { name: 1, email: 1, phone: 1 })
      .populate('vet', { name: 1, email: 1, phone: 1 })
      .populate('dogMedicalHistory')
      .populate('catMedicalHistory')
      .populate('image')
      .sort({ name: 1 })
      .exec();

    res.status(200).json(pets);
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: 'An error occurred',
    });
  }
};

export const getPetsForUserVet = async (req: any, res: any) => {
  const { _id, search } = req.query;
  const limit = parseInt(req.query.limit);
  const page = parseInt(req.query.page);
  const startIndex = (page - 1) * limit;

  try {
    let pets: IPet[] = await Pet.find({
      userVet: _id,
      name: { $regex: new RegExp(search.toLowerCase()) },
    })
      .populate('image')
      .skip(startIndex)
      .limit(limit)
      .sort({ name: 1 })
      .exec();

    const totalPets: IPet[] = await Pet.find({
      userVet: _id,
      name: { $regex: new RegExp(search) },
    });

    res.status(200).json({
      pets,
      totalPets: totalPets.length,
    });
  } catch (e) {
    console.error(e);
    res.status(500).send({
      message: 'An error occurred on pets vet',
    });
  }
};

export const getPetsForUserTransit = async (req: any, res: any) => {
  const { _id, search } = req.query;
  const limit = parseInt(req.query.limit);
  const page = parseInt(req.query.page);
  const startIndex = (page - 1) * limit;

  try {
    const pets: IPet[] = await Pet.find({
      userTransit: _id,
      name: { $regex: new RegExp(search.toLowerCase()) },
    })
      .populate('image')
      .skip(startIndex)
      .limit(limit)
      .sort({ adopted: 1 })
      .exec();

    const totalPets: IPet[] = await Pet.find({
      userTransit: _id,
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

export const searchFilterPet = async (req: any, res: any) => {
  const limit = parseInt(req.query.limit);
  const page = parseInt(req.query.page);
  const startIndex = (page - 1) * limit;

  let query = {
    adopted: false,
    'userCreator.role': 'shelter',
  };

  const petsAggregate = [
    {
      $lookup: {
        from: 'users',
        localField: 'userCreator',
        foreignField: '_id',
        as: 'userCreator',
      },
    },
    { $unwind: '$userCreator' },
  ];

  // Object.entries(req.query).forEach(async ([key, value]) => {
  //   if (value !== '' && value !== undefined) {
  //     // @ts-ignore
  //     if (key === 'country') {
  //       // @ts-ignore
  //       query.country = new RegExp(value, 'i');
  //     }
  //     // @ts-ignore
  //     if (key === 'city') {
  //       // @ts-ignore
  //       query.city = new RegExp(value, 'i');
  //     }
  //     if (key === 'gender') {
  //       // @ts-ignore
  //       query.gender = value;
  //     }
  //     if (key === 'category') {
  //       // @ts-ignore
  //       query.category = value;
  //     }
  //   }
  // });

  try {
    // const register: IPet[] = await Pet.aggregate(petsAggregate)
    //   .match(query)
    //   .skip(startIndex)
    //   .limit(limit)
    //   .project({
    //     name: 1,
    //     image: 1,
    //     urgent: 1,
    //     gender: 1,
    //     country: 1,
    //     history: 1,
    //     category: 1,
    //     activityLevel: 1,
    //   });
    const register: IPet[] = await Pet.find()
      .populate('userCreator', { name: 1, email: 1, phone: 1, role: 1 })
      .populate('userAdopter', { name: 1, email: 1, phone: 1 })
      .populate('userTransit', { name: 1, email: 1, phone: 1 })
      .populate('userShelter', { name: 1, email: 1, phone: 1 })
      .populate('userVet', { name: 1, email: 1, phone: 1 })
      .sort({ name: 1 })
      .exec();

    const totalCount: IPet[] = await Pet.aggregate(petsAggregate).match(query);

    res.status(200).json({
      pets: register,
      totalPets: totalCount.length,
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: 'An error occurred',
    });
  }
};
