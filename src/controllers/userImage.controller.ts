import { Request, Response } from 'express';
import UserImage from '../models/userImage';

export const addUserImages = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const register = await UserImage.create({ filenames: req.imageUrl });

    res.status(200).json(register);
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: 'Error occurred in create user image',
    });
  }
};

export const updateUserImages = async (req: Request, res: Response) => {
  try {
    const register = await UserImage.findOneAndUpdate(
      { _id: req.body._id },
      // @ts-ignore
      { filenames: req.imageUrl }
    );

    res.status(200).json(register);
    // } else {
    res.status(200).send({
      message: 'the user did not update the image and everything is fine.',
    });
    // }
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
