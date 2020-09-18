import * as dotenv from 'dotenv';
dotenv.config();

export default {
  jwrSecret: process.env.JWT_SECRET || 'seedSecreteToken',
  DB: {
    URI: process.env.DB_MONGO_DB_URL || 'mongodb://localhost:27017/petsLove-typescript',
    USER: '',
    PASSWORD: '',
  },
  awsConfig: {
    SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY || '',
    ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID || '',
    REGION: process.env.AWS_REGION || '',
    BUCKET: process.env.AWS_BUCKET || '',
  },
  gmail: {
    user: process.env.AWS_SECRET_ACCESS_KEY || '',
    pass: process.env.AWS_ACCESS_KEY_ID || '',
  },
};
