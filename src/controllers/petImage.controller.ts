import { Request, Response } from 'express';
import PetImage from '../models/petImage';

export const addPetImages = async (req: any, res: any) => {
  try {
    let url: Array<String> = [];

    if (req.imageUrl) {
      req.imageUrl.forEach((image: any) => {
        url.push(image.key);
      });
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
    if (req.imageUrl) {
      console.log(1, req.imageUrl);
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
      req.imageUrl.forEach((image: any) => {
        console.log(2, image.key)
        data.push(image.key);
      });
    } else {
      data.push(req.body.image);
    }
    console.log(3, req.body);
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
