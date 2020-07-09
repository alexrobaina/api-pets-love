export default {
  jwrSecret: process.env.JWT_SECRET || 'seedSecreteToken',
  DB: {
    URI: process.env.DB_MONGO_DB_URL || 'mongodb://localhost:27017/petsLove-typescript',
    USER: '',
    PASSWORD: '',
  },
};
