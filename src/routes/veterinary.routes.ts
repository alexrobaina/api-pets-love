import { Router } from 'express';
import passport from 'passport';
const router = Router();

import { listPetsVeterinaryCared } from '../controllers/veterinary.controller';

router.get(
  '/veterinary/listPetsVeterinaryCared',
  passport.authenticate('jwt', { session: false }),
  listPetsVeterinaryCared
);

export default router;
