import { Request, Response } from 'express';
import UserImage from '../models/userImage';

export const addUserImages = async (req: Request, res: Response) => {
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
    const register = await UserImage.create({ filenames: url });

    res.status(200).json(register);
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: 'Error occurred in create user image',
    });
  }
};

export const updateUserImages = async (req: Request, res: Response) => {
  console.log(req.files);
  try {
    if (req.files.length > 0) {
      const data: Array<String> = [];
      // @ts-ignore
      req.files.forEach(image => {
        data.push(image.filename);
      });

      const register = await UserImage.findOneAndUpdate({ _id: req.body._id }, { filenames: data });

      res.status(200).json(register);
    } else {
      res.status(200).send({
        message: 'the user did not update the image and everything is fine.',
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: 'Error occurred in update image user',
    });
  }
};

export const listUserImage = async (req: Request, res: Response) => {
  try {
    const register = await UserImage.find().exec();

    res.status(200).json(register);
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: 'An error occurred on List image user',
    });
  }
};
