import upload from '../services/file-upload';
const uploadImages = upload.array('images');

const awsStorageImage = (req: any, res: any, next: Function) => {
  try {
    const saveImage = new Promise((resolve, reject) => {
      uploadImages(req, res, function (err: any) {
        if (req?.files?.length === 1) {
          req.imageUrl = req.files;
          resolve(req);
        }

        if (req?.files?.length > 1) {
          req.imageUrl = req.files;
          resolve(req);
        }

        if (err) {
          reject('File upload image');
          return res.status(422).send({ errors: [{ title: 'File upload Error' }] });
        }

        next();
      });
    });

    Promise.all([saveImage]).then(url => {
      next();
    });
  } catch (e) {
    return res.status(500).json({
      message: 'Error save image',
    });
  }
};

export default awsStorageImage;
