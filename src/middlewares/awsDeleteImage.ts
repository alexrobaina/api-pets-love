import deleteImage from '../services/delete-files-aws';

const awsDeleteImage = async (imagesDeleted: any, folderBucketName: string) => {
  try {
    // @ts-ignore
    await deleteImage(imagesDeleted, folderBucketName);
  } catch (error) {
    console.log(error);
  }
};

export default awsDeleteImage;
