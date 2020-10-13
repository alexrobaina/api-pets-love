import * as dotenv from 'dotenv';
dotenv.config();

if (process.env.DB_MONGO_DB_USER === undefined || process.env.DB_MONGO_DB_PASSWORD === undefined || process.env.DB_MONGO_DB_HOST === undefined || process.env.DB_MONGO_DB_NAME === undefined){
  console.log('Please set up a DB and configure the .env file');
  process.exit(0);
}

export default {
  jwrSecret: process.env.JWT_SECRET || 'seedSecreteToken',
  DB: {
    URI: `mongodb://${process.env.DB_MONGO_DB_USER}:${process.env.DB_MONGO_DB_PASSWORD}@${process.env.DB_MONGO_DB_HOST}/${process.env.DB_MONGO_DB_NAME}?authSource=admin`,
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
