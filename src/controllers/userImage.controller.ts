import { Request, Response } from 'express';
import UserImage from '../models/userImage';
import * as dotenv from 'dotenv';
import config from '../config/config';
import deleteImage from '../services/delete-files-aws';
dotenv.config();

export const addUserImages = async (req: any, res: any) => {
  try {
    if (req.imageUrl) {
      const register = await UserImage.create({ filenames: req.imageUrl[0].key });

      res.status(200).json(register);
    }
    res.status(200).json({
      message: 'Not exist images for save. But dont worry its fine',
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: 'Error occurred in create user image',
    });
  }
};

export const updateUserImages = async (req: any, res: any) => {
  try {
    let data: Array<String> = [];

    if (req.imageUrl) {
      if (typeof req.body.image === 'string') {
        data.push(req.body.image);
      }

      if (req.imageUrl.length > 0) {
        req.imageUrl.forEach((image: any) => {
          data.push(image.key);
        });
      }

      const register = await UserImage.findOneAndUpdate({ _id: req.body._id }, { filenames: data });
      res.status(200).json(register);
    }

    res.status(200).send({
      message: 'the user did not update the image and everything is fine.',
    });
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

export const deleteUserImage = async (req: Request, res: Response) => {
  const { image } = req.query;
  try {
    if (image) {
      await deleteImage(image, config.awsConfig.USER_BUCKET_FOLDER);
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
