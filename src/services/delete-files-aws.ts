import { Request } from 'express';
import * as dotenv from 'dotenv';
import aws from 'aws-sdk';
dotenv.config();

import config from '../config/config';

aws.config.update({
  secretAccessKey: config.awsConfig.SECRET_ACCESS_KEY,
  accessKeyId: config.awsConfig.ACCESS_KEY_ID,
  region: config.awsConfig.REGION,
});
const s3 = new aws.S3();

const deleteImage = async (arrayImage: any) => {
  try {
    const params: any = {
      Bucket: config.awsConfig.BUCKET,
    };

    s3.listObjects(params, function (err, data) {
      if (err) return console.log(err);

      params.Delete = { Objects: [] };

      arrayImage.forEach((content: string) => {
        params.Delete.Objects.push({ Key: content });
      });

      s3.deleteObjects(params, function (err, data) {
        if (err) console.log(err);
        else {
          console.log('well done!');
          return true;
        }
      });
    });
  } catch (e) {
    console.log(e);
  }
};

export default deleteImage;
