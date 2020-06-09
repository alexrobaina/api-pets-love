export default {
  jwrSecret: process.env.JWT_SECRET || 'seedSecreteToken',
  DB: {
    URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/petsLove-typescript',
    USER: '',
    PASSWORD: '',
  },
};
