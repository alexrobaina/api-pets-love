import express from 'express';
// morgan sirve para ver las peticiones a la api cuando esta corriendo el servidor en la consola
import morgan from 'morgan';
// sirve para comunicarnos con otros tipos de servidores de desarrollo
import cors from 'cors';
import passport from 'passport';
import passportMiddleware from './middlewares/passport';

import authRoute from './routes/auth.routes';
import petRoutes from './routes/pet.routes';
import imageRoutes from './routes/image.routes';
import dashboardRoutes from './routes/dashboard.routes';
import volunteersRoutes from './routes/volunteers.routes';
import veterinaryRoutes from './routes/veterinary.routes';
import adopterRoutes from './routes/adopter.routes';
import forgotPasswordRoutes from './routes/forgotPassword.routes';
import { v4 as uuidv4 } from 'uuid';
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

// routes
app.get('/', (req, res) => {
  res.send(`Welcome to Petslove 🦄`);
});

app.use(authRoute);
app.use(petRoutes);
app.use(imageRoutes);
app.use(adopterRoutes);
app.use(dashboardRoutes);
app.use(volunteersRoutes);
app.use(veterinaryRoutes);
app.use(forgotPasswordRoutes);

export default app;
