import upload from '../services/file-upload';
const uploadImages = upload.array('newImages');

const awsStorageImage = (req: any, res: any, next: Function) => {
  console.log('awsStorageImage');

  try {
    const saveImage = new Promise((resolve, reject) => {
      uploadImages(req, res, function (err: any) {
        if (req?.files?.length === 1) {
          req.imageUrl = req.files;
        }

        if (req?.files?.length > 1) {
          req.imageUrl = req.files;
        }

        if (err) {
          reject('File upload image');
          return res.status(422).send({ errors: [{ title: 'File upload Error' }] });
        }

        resolve(req);
      });
    });

    Promise.all([saveImage]).then(url => {
      next();
    });
  } catch (e) {
    res.status(500).json({
      message: 'Error save image',
    });
  }
};

export default awsStorageImage;
