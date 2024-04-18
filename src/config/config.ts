import dotenv from 'dotenv';
dotenv.config();

export const config = {
  APP_NAME: 'Petslove 🦄',
  HOST: process.env.HOST || 'http://localhost',
  PORT: process.env.PORT || '3011',
  EXPIRES_IN: 86400,
  JWT_SEED: process.env.JWT_SEED || 'key-desarollo-secrets-yes',
  google: {
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || '',
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || '',
    CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL || '',
  },
  gmail: {
    user: process.env.GMAIL_USER || '',
    pass: process.env.GMAIL_PASS || '',
  },
};
