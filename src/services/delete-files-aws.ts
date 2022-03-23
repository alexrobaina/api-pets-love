import * as dotenv from 'dotenv';
import aws from 'aws-sdk';
import { config } from '../config/config';
dotenv.config();

const deleteImage = async (images: any, folderBucketName: string) => {
  try {
    aws.config.update({
      secretAccessKey: config.awsConfig.SECRET_ACCESS_KEY,
      accessKeyId: config.awsConfig.ACCESS_KEY_ID,
      region: config.awsConfig.REGION,
    });
    const s3 = new aws.S3();

    const params: any = {
      Bucket: `${config.awsConfig.BUCKET}`,
    };

    s3.listObjects(params, function (err, data) {
      if (err) return console.log(err);

      params.Delete = { Objects: [] };

      if (Array.isArray(images)) {
        images.forEach((content: string) => {
          params.Delete.Objects.push({ Key: `${folderBucketName}/${content}` });
        });
      } else {
        params.Delete.Objects.push({ Key: `${folderBucketName}/${images}` });
      }

      s3.deleteObjects(params, function (err, data) {
        if (err) console.log(err);
        else {
          return true;
        }
      });
    });
  } catch (e) {
    console.log(e);
  }
};

export default deleteImage;
