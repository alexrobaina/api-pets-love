import dotenv from 'dotenv';
dotenv.config();

export const config = {
  APP_NAME: 'Petslove 🦄',
  PORT: process.env.PORT || '3001',
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27018/petslove',
  EXPIRES_IN: 86400,
  SEED: process.env.SEED || 'key-desarollo-secrets-yes',
  USER_NODEMAILER: process.env.USER_NODEMAILER,
  PASS_NODEMAILER: process.env.PASS_NODEMAILER,
  URL_SITE: process.env.URL_SITE,
  awsConfig: {
    SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    REGION: process.env.AWS_REGION,
    BUCKET: process.env.AWS_BUCKET,
    PET_BUCKET_FOLDER: 'pets',
    USER_BUCKET_FOLDER: 'users',
  },
  gmail: {
    user: process.env.GMAIL_USER || '',
    pass: process.env.GMAIL_PASS || '',
  },
};
