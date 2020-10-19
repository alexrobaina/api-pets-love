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

const deleteImage = async () => {
  const params = {
    Bucket: config.awsConfig.BUCKET,
    Key: 'filename', //if any sub folder-> path/of/the/folder.ext
  };
  try {
    await s3.headObject(params).promise();
    console.log('File Found in S3');
    try {
      await s3.deleteObject(params).promise();
      console.log('file deleted Successfully');
    } catch (err) {
      console.log('ERROR in file Deleting : ' + JSON.stringify(err));
    }
  } catch (err) {
    console.log('File not Found ERROR : ' + err.code);
  }
};

export default deleteImage;
