export const config = {
  APP_NAME: 'Petslove 🦄',
  PORT: process.env.PORT || '3001',

  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27018/petslove',
  EXPIRES_IN: process.env.EXPIRES_IN || 86400,
  SEED: process.env.SEED || 'key-desarollo-secrets-yes',

  USER_NODEMAILER: process.env.USER_NODEMAILER,
  PASS_NODEMAILER: process.env.PASS_NODEMAILER,

  URL_SITE: process.env.URL_SITE,
};
