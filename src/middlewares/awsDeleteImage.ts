import deleteImage from '../services/delete-files-aws';

const awsDeleteImage = async (req: any, res: any, next: Function) => {
  console.log(req.body);
  try {
    await deleteImage(req.body.image);
    return res.status(200).json({
      message: 'Image delete success',
    });
  } catch {
    return res.status(500).json({
      message: 'Error aws delete image',
    });
  }
};

export default awsDeleteImage;
