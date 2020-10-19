import deleteImage from '../services/delete-files-aws';

const awsDeleteImage = (req: any, res: any, next: Function) => {
  try {
    const deleting = new Promise((resolve, reject) => {
      console.log(req.params);
      //   if (req.files.length > 0) {
      //     req.imageUrl = req.files;

      //     resolve(req.files);
      //   } else {
      //     resolve('ok');
      //   }
      //   reject('Error delete file');
      //   return res.status(400).send({ errors: [{ title: 'Error delete file' }] });
      // });

      Promise.all([deleting]).then(url => {
        next();
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: 'Error save image',
    });
  }
};

export default awsDeleteImage;
