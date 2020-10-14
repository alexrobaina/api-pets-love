import * as dotenv from 'dotenv';
const result = dotenv.config();

if (result.error) {
  console.log('Please set up a .env file with values. See README.md for more info.');
  process.exit(0);
}

export default {
  jwrSecret: process.env.JWT_SECRET || ' ',
  DB: {
    URI: `mongodb://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@${process.env.MONGO_DB_HOST}:${process.env.MONGO_DB_HOST_PORT}/${process.env.MONGO_DB_NAME}?authSource=admin`,
  },
  awsConfig: {
    SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY || '',
    ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID || '',
    REGION: process.env.AWS_REGION || '',
    BUCKET: process.env.AWS_BUCKET || '',
  },
  gmail: {
    user: process.env.GMAIL_USER || '',
    pass: process.env.GMAIL_PASS || '',
  },
};
