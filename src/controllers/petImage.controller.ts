import { Request, Response } from 'express';
import * as dotenv from 'dotenv';
import PetImage from '../models/petImage';
import config from '../config/config';
import deleteImage from '../services/delete-files-aws';
dotenv.config();

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
        data.push(image.key);
      });
    } else {
      if (typeof req.body.image === 'string') {
        data.push(req.body.image);
      } else {
        if (req.body.image) {
          req.body.image.forEach((image: any) => {
            data.push(image);
          });
        }
      }
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

export const deletePetImage = async (req: Request, res: Response) => {
  try {
    const register = await PetImage.findByIdAndDelete({
      _id: req.query._id,
    });

    res.status(200).json(register);
  } catch (e) {
    res.status(500).send({
      message: 'An error occurred in remove pet',
    });
  }
};

export const deleteImages = async (req: Request, res: Response) => {
  const { image } = req.query;
  try {
    if (image) {
      await deleteImage(image, config.awsConfig.PET_BUCKET_FOLDER);
    }

    res.status(200).send({
      message: 'delete image success',
    });
  } catch (e) {
    res.status(500).send({
      message: 'An error occurred in remove image pet',
    });
  }
};
