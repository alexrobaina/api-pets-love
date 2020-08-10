import { Router } from 'express';
import passport from 'passport';
const router = Router();

import {
  listUsersRole,
  signIn,
  signUp,
  update,
  userId,
  listUsers,
} from '../controllers/user.controller';

router.post('/api/user/create', signUp);
router.post('/api/user/login', signIn);
router.put('/api/user/update', passport.authenticate('jwt', { session: false }), update);
router.get('/api/user/query', passport.authenticate('jwt', { session: false }), userId);
router.get('/api/user/listUsers', passport.authenticate('jwt', { session: false }), listUsers);

router.get(
  '/api/user/listUsersRole',
  passport.authenticate('jwt', { session: false }),
  listUsersRole
);

router.get(
  '/api/user/updateUserImages',
  passport.authenticate('jwt', { session: false }),
  listUsersRole
);

export default router;
