import { Request, Response } from 'express';
import PetImage from '../models/petImage';

export const addPetImages = async (req: any, res: any) => {
  let data: Array<String> = [];
  
  try {
    // process new image
    if (req.imageUrl) {
      req.imageUrl.forEach((image: any) => {
        data.push(image.key);
      });
    }
    
    const register = await PetImage.create({ filenames: data });

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

    // process old image
    if (req.body.image) {
      if (typeof req.body.image === 'string') {
        data.push(req.body.image);
      } else {
        req.body.image.forEach((image: any) => {
          data.push(req.body.image);
        });
      }
    }

    // process new image
    if (req.imageUrl) {
      req.imageUrl.forEach((image: any) => {
        data.push(image.key);
      });
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
