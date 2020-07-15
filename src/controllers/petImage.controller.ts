import { Request, Response } from 'express';
import PetImage from '../models/petImage';

export const addPetImages = async (req: Request, res: Response) => {
  try {
    let url: any = [];

    if (req.files) {
      if (req.files.length > 0) {
        // @ts-ignore
        req.files.forEach(image => {
          url.push(image.filename);
        });
      }
    }
    const register = await PetImage.create({ filenames: url });

    res.status(200).json(register);
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: 'Error occurred in create pet',
    });
  }
};

export const updatePetImages = async (req: any, res: any) => {
  try {
    let data: Array<String> = [];

    if (req.files) {
      if (typeof req.body.image === 'string') {
        data.push(req.body.image);
      }

      if (
        req.body.image !== 'string' &&
        req.body.image !== undefined &&
        typeof req.body.image !== 'string'
      ) {
        req.body.image.forEach((image: any) => {
          data.push(image);
        });
      }

      if (req.files.length > 0) {
        req.files.forEach((image: any) => {
          data.push(image.filename);
        });
      }
    } else {
      data.push(req.body._id);
    }

    const register = await PetImage.findOneAndUpdate({ _id: req.body._id }, { filenames: data });

    res.status(200).json(register);
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: 'Error occurred in create pet',
    });
  }
};

export const listPetImage = async (req: Request, res: Response) => {
  try {
    const register = await PetImage.find().exec();

    res.status(200).json(register);
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: 'An error occurred on List pets',
    });
  }
};
