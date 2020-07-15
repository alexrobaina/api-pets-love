import upload from '../services/file-upload';
const singleUpload = upload.array('image');

const awsStorageImage = (req: any, res: any, next: Function) => {
  try {
    const saveImage = new Promise((resolve, reject) => {
      let url;
      singleUpload(req, res, function (err: any) {
        if (req.files !== []) {
          req.imageUrl = req.files;
        }

        resolve(req.files);

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
