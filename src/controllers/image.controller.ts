import { Request, Response } from 'express';
import Image from '../models/image';

export const addImages = async (req: Request, res: Response) => {
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
    const register = await Image.create({ filenames: url });

    res.status(200).json(register);
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: 'Error occurred in create pet',
    });
  }
};

export const listImage = async (req: Request, res: Response) => {
  try {
    const register = await Image.find().exec();

    res.status(200).json(register);
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: 'An error occurred on List pets',
    });
  }
};
