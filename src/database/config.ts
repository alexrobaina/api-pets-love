import mongoose, { ConnectionOptions } from 'mongoose';

const URI = process.env.MONGO_URI || 'mongodb://localhost:27018/petslove';

const dbOptions: ConnectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
};

mongoose.connect(URI, dbOptions);

const connection = mongoose.connection;

connection.once('open', () => {
  console.log('Mongodb connection start');
});

connection.on('error', err => {
  console.log(err);
  process.exit(0);
});
