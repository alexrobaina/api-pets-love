import { Router } from 'express';
import passport from 'passport';
const router = Router();

import {
  getPetsVolunteersOwner,
  getPetsAssignedVolunteer,
} from '../controllers/volunteers.controller';

router.get(
  '/volunteers/getPetsVolunteersOwner',
  passport.authenticate('jwt', { session: false }),
  getPetsVolunteersOwner
);

router.get('/volunteers/getPetsAssignedVolunteer', getPetsAssignedVolunteer);

export default router;
