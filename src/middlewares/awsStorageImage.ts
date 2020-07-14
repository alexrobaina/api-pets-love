import { Request, Response } from 'express';
import upload from '../services/file-upload';
const singleUpload = upload.single('image');

const awsStorageImage = (req: Request, res: Response, next: Function) => {
  try {
    let url: any = [];

    const saveImage = new Promise((resolve, reject) => {
      singleUpload(req, res, function (err: any) {
        // @ts-ignore
        url.push(req.file.key);
        // @ts-ignore
        req.imageUrl = url;
        // @ts-ignore
        resolve(url);

        if (err) {
          reject('File upload image');
          return res.status(422).send({ errors: [{ title: 'File upload Error' }] });
        }
      });
    });

    Promise.all([saveImage]).then(url => {
      next();
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: 'Error save image',
    });
  }
};

export default awsStorageImage;
