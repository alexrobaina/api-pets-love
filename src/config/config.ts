import * as dotenv from 'dotenv';
const result = dotenv.config();

const IS_DEV = process.env.DEV ? true : false;

if (result.error && IS_DEV) {
  console.log('Please set up a .env file with values. See README.md for more info.');
  process.exit(0);
}

export default {
  jwrSecret: process.env.JWT_SECRET || ' ',
  DB: {
    URI: process.env.TEST,
    // URI: !IS_DEV
    //   ? `${process.env.MONGO_DB_PREFIX}${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@${process.env.MONGO_DB_HOST}/${process.env.MONGO_DB_NAME}${process.env.MONGO_DB_OPTIONS}`
    //   : `${process.env.MONGO_DB_PREFIX}${process.env.MONGO_DB_HOST}:${process.env.MONGO_DB_HOST_PORT}/${process.env.MONGO_DB_NAME}${process.env.MONGO_DB_OPTIONS}`,
  },
  awsConfig: {
    SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY || '',
    ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID || '',
    REGION: process.env.AWS_REGION || '',
    BUCKET: process.env.AWS_BUCKET || '',
    PET_BUCKET_FOLDER: 'pet_images',
    USER_BUCKET_FOLDER: 'user_images',
  },
  gmail: {
    user: process.env.GMAIL_USER || '',
    pass: process.env.GMAIL_PASS || '',
  },
};
