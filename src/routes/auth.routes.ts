import { Router } from 'express';
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
router.put('/api/user/update', update);
router.get('/api/user/query', userId);
router.get('/api/user/listUsersRole', listUsersRole);
router.get('/api/user/listUsers', listUsers);
router.get('/api/user/updateUserImages', listUsersRole);

export default router;
