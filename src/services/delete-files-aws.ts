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
    if (arrayImage) {
      let deleteItems: any = [];

      arrayImage.forEach((imgUrl: string) => {
        deleteItems.push({ key: imgUrl });
      });

      const params: any = {
        Bucket: config.awsConfig.BUCKET,
        Delete: {
          Objects: [
            {
              key: deleteItems[0],
            },
          ],
          Quiet: false,
        },
      };

      s3.deleteObjects(params, function (err, data) {
        console.log('Successfully deleted myBucket/myKey', data);
      });
    }
  } catch (e) {
    console.log(e);
  }
};

export default deleteImage;
