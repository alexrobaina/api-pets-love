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

router.post('/user/create', signUp);
router.post('/user/login', signIn);
router.put('/user/update', passport.authenticate('jwt', { session: false }), update);
router.get('/user/query', userId);
router.get('/user/listUsers', listUsers);
router.get('/user/listUsersRole', listUsersRole);

router.get(
  '/user/updateUserImages',
  passport.authenticate('jwt', { session: false }),
  listUsersRole
);

export default router;
