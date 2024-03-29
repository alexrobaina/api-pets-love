import { Storage } from '@google-cloud/storage';
import path from 'path';
import Multer from 'multer';

const storage = new Storage({
  keyFilename: path.join('pets-love-398920-e3d0357ac41a.json'),
});

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit to 5MB
});

export const gCloudBucketFiles = (req: any, res: any, next: Function) => {
  const bucketName = 'pets-love-398920.appspot.com';
  multer.single('images')(req, res, async err => {
    if (err) {
      console.error(err);
      res.locals.error = { status: 500, message: 'Something is wrong!', error: err };
      return next();
    }

    if (!req.file) {
      res.locals.error = { status: 400, message: 'No file provided!' };
      return next();
    }

    try {
      const bucket = storage.bucket(bucketName);
      const fileName = `users/1${Date.now()}`;
      const file = bucket.file(fileName);

      const blobStream = file.createWriteStream({
        metadata: { contentType: req.file.mimetype },
      });

      blobStream.on('error', err => {
        console.error(err);
        res.locals.error = { status: 500, message: 'Something is wrong!', error: err };
        return next();
      });

      blobStream.on('finish', async () => {
        try {
          await file.makePublic();

          const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
          res.locals.file = { url: publicUrl };
          return next();
        } catch (err) {
          console.error(err);
          res.locals.error = { status: 500, message: 'Something is wrong!', error: err };
          return next();
        }
      });

      blobStream.end(req.file.buffer);
    } catch (error) {
      console.error(error);
      res.locals.error = { status: 500, message: 'Something is wrong!', error: error };
      return next();
    }
  });
};
