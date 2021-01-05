import mongoose, { ConnectionOptions } from 'mongoose';
import config from './config/config';

const dbOptions: ConnectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
};

console.log(config.DB.URI);

mongoose.connect(config.DB.URI, dbOptions);

const connection = mongoose.connection;

connection.once('open', () => {
  console.log('Mongodb connection start');
});

connection.on('error', err => {
  console.log(err);
  process.exit(0);
});
