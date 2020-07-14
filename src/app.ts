import express from 'express';
// morgan sirve para ver las peticiones a la api cuando esta corriendo el servidor en la consola
import morgan from 'morgan';
// sirve para comunicarnos con otros tipos de servidores de desarrollo
import cors from 'cors';
import passport from 'passport';
import passportMiddleware from './middlewares/passport';

import authRoute from './routes/auth.routes';
import privateRoutes from './routes/private.routes';
import petRoutes from './routes/pet.routes';
import imageRoutes from './routes/image.routes';

import { v4 as uuidv4 } from 'uuid';
import multer from 'multer';
import multerS3 from 'multer-s3';
import path from 'path';

// initializations
const app = express();

// settings
app.set('port', process.env.PORT || 3000);

// middleware
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'uploads')));
app.use(passport.initialize());
passport.use(passportMiddleware);
//
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads');
//   },
//   filename: (req, file, cd) => {
//     cd(null, '_petsLove_' + uuidv4() + path.extname(file.originalname));
//   },
  // limits: { fileSize: 300000 },
  // fileFilter: (req, file, cd) => {
  //   const filetypes = /jpeg|jpg|png|gif/;
  // },
// });
//
// app.use(
//   multer({
//     storage: storage,
//   }).array('image')
// );

// routes
app.get('/', (req, res) => {
  res.send(`Welcome to petslove. Running in http://localhost:${app.get('port')}`);
});

app.use(authRoute);
app.use(privateRoutes);
app.use(imageRoutes);
app.use(petRoutes);

export default app;
