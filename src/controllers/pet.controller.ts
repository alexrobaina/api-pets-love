import {Request, Response} from 'express';
import Pet, {IPet} from '../models/pet';
import DogMedicalHistory, {IDogMedicalHistory} from '../models/dogMedicalHistory';
import CatMedicalHistory, {ICatMedicalHistory} from '../models/catMedicalHistory';

export const create = async (req: Request, res: Response) => {
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
    }
  });

  if (req.body.category === 'dog') {
    if (req.body.medicalDog._id !== undefined) {
      await DogMedicalHistory.findOneAndUpdate(
        {_id: req.body.medicalDog._id},
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
        {_id: req.body.medicalCat._id},
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
    const register = await Pet.findOneAndUpdate({_id: req.body._id}, data);

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
      .populate('userCreator', {name: 1, email: 1, phone: 1, role: 1})
      .populate('userAdopter', {name: 1, email: 1, phone: 1})
      .populate('userTransit', {name: 1, email: 1, phone: 1})
      .populate('userVet', {name: 1, email: 1, phone: 1})
      .populate('dogMedicalHistory')
      .populate('catMedicalHistory')
      .populate('image')
      .sort({name: 1})
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
    const register: IPet[] = await Pet.find({_id: req.query._id})
      .populate('userCreator', {name: 1, email: 1, phone: 1, role: 1})
      .populate('userAdopter', {name: 1, email: 1, phone: 1})
      .populate('userTransit', {name: 1, email: 1, phone: 1})
      .populate('userVet', {name: 1, email: 1, phone: 1})
      .populate('dogMedicalHistory')
      .populate('catMedicalHistory')
      .populate('image')
      .sort({name: 1})
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
    const register: IPet[] = await Pet.find({_id: req.query._id})
      .populate('userCreator', {name: 1, email: 1, phone: 1, role: 1})
      .populate('userAdopter', {name: 1, email: 1, phone: 1})
      .populate('userTransit', {name: 1, email: 1, phone: 1})
      .populate('userVet', {name: 1, email: 1, phone: 1})
      .populate('dogMedicalHistory')
      .populate('catMedicalHistory')
      .populate('image')
      .sort({name: 1})
      .exec();

    res.status(200).json(register);
  } catch (e) {
    res.status(500).send({
      message: 'An error occurred on petsForAdoption',
    });
  }
};

export const petsForAdoption = async (req: any, res: any) => {
  const {_id} = req.query;
  const limit = parseInt(req.query.limit);
  const page = parseInt(req.query.page);
  const startIndex = (page - 1) * limit;

  try {
    const registers: IPet[] = await Pet.find({
      adopted: false,
      userCreator: _id,
    })
      .populate('userCreator', {name: 1, email: 1, phone: 1})
      .populate('userAdopter', {name: 1, email: 1, phone: 1})
      .populate('userTransit', {name: 1, email: 1, phone: 1})
      .populate('dogMedicalHistory')
      .populate('catMedicalHistory')
      .populate('vet', {name: 1, email: 1, phone: 1})
      .skip(startIndex)
      .limit(limit)
      .populate('image')
      .sort({name: 1})
      .exec();

    const totalRegisters: IPet[] = await Pet.find({
      adopted: false,
      userCreator: _id,
    });

    res.status(200).json({
      registers,
      totalPets: totalRegisters.length,
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: 'An error occurred on petsForAdoption',
    });
  }
};

export const petsAdopted = async (req: any, res: any) => {
  const {_id} = req.query;
  const limit = parseInt(req.query.limit);
  const page = parseInt(req.query.page);
  const startIndex = (page - 1) * limit;

  try {
    const registers: IPet[] = await Pet.find({
      adopted: true,
      userCreator: _id,
    })
      .populate('image')
      .skip(startIndex)
      .limit(limit)
      .sort({name: 1})
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
    const pets: IPet[] = await Pet.find({userCreator: req.query._id})
      .populate('userCreator', {name: 1, email: 1, phone: 1})
      .populate('userAdopter', {name: 1, email: 1, phone: 1})
      .populate('userTransit', {name: 1, email: 1, phone: 1})
      .populate('vet', {name: 1, email: 1, phone: 1})
      .populate('dogMedicalHistory')
      .populate('catMedicalHistory')
      .populate('image')
      .sort({name: 1})
      .exec();

    res.status(200).json(pets);
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: 'An error occurred',
    });
  }
};

export const getPetForUserAdopted = async (req: any, res: any) => {
  const {_id} = req.query;
  const limit = parseInt(req.query.limit);
  const page = parseInt(req.query.page);
  const startIndex = (page - 1) * limit;
  try {
    const register: IPet[] = await Pet.find({userAdopter: _id})
      .populate('image')
      .skip(startIndex)
      .limit(limit)
      .sort({name: 1})
      .exec();

    res.status(200).json(register);
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: 'An error occurred',
    });
  }
};

export const getPetsForUserVet = async (req: any, res: any) => {
  const {_id} = req.query;
  const limit = parseInt(req.query.limit);
  const page = parseInt(req.query.page);
  const startIndex = (page - 1) * limit;

  try {
    const pets: IPet[] = await Pet.find({
      userVet: _id,
    })
      .populate('image')
      .skip(startIndex)
      .limit(limit)
      .sort({name: 1})
      .exec();

    const totalRegisters: IPet[] = await Pet.find({
      userVet: _id,
    });

    const userCreator: IPet[] = await Pet.find({
      userCreator: _id,
    })
      .populate('image')
      .skip(startIndex)
      .limit(limit)
      .sort({name: 1})
      .exec();

    if (userCreator !== []) {
      pets.push(userCreator[0])
      totalRegisters.push(userCreator[0])
    }

    res.status(200).json({
      pets,
      totalPets: totalRegisters.length,
    });
  } catch (e) {
    console.error(e);
    res.status(500).send({
      message: 'An error occurred on pets vet',
    });
  }
};

export const getPetsForUserTransit = async (req: any, res: any) => {
  const {_id} = req.query;
  const limit = parseInt(req.query.limit);
  const page = parseInt(req.query.page);
  const startIndex = (page - 1) * limit;

  try {
    const pets: IPet[] = await Pet.find({
      userTransit: _id,
    })
      .populate('image')
      .skip(startIndex)
      .limit(limit)
      .sort({adopted: 1})
      .exec();

    const totalRegisters: IPet[] = await Pet.find({
      userTransit: _id,
    });

    const userCreator: IPet[] = await Pet.find({
      userCreator: _id,
    })
      .populate('image')
      .skip(startIndex)
      .limit(limit)
      .sort({name: 1})
      .exec();

    if (userCreator !== []) {
      pets.push(userCreator[0])
      totalRegisters.push(userCreator[0])
    }

    res.status(200).json({
      pets,
      totalPets: totalRegisters.length,
    });
  } catch (e) {
    console.error(e);
    res.status(500).send({
      message: 'An error occurred on pets transit',
    });
  }
};

export const queryList = async (req: any, res: any) => {
  const limit = parseInt(req.query.limit);
  const page = parseInt(req.query.page);
  const startIndex = (page - 1) * limit;

  let query = {};

  Object.entries(req.query).forEach(([key, value]) => {
    if (value !== '' && value !== undefined) {
      // @ts-ignore
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
    if (req.query.city !== '' || req.query.category !== '' || req.query.gender !== '') {
      const register: IPet[] = await Pet.find({
        $and: [query],
      })
        .populate('image')
        .skip(startIndex)
        .limit(limit)
        .sort({adopted: 1})
        .exec();


      const totalRegisters: IPet[] = await Pet.find({
        $and: [query],
      });

      res.status(200).json({
        pets: register,
        totalPets: totalRegisters.length,
      });
    } else {
      const register: IPet[] = await Pet.find()
        .populate('image')
        .skip(startIndex)
        .limit(limit)
        .sort({adopted: 1})
        .exec();

      const totalRegisters: IPet[] = await Pet.find({
        $and: [query],
      })

      res.status(200).json({
        pets: register,
        totalPets: totalRegisters.length,
      });
    }
  } catch (e) {
    res.status(500).send({
      message: 'An error occurred',
    });
  }
};
