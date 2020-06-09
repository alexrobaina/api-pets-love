import { Router } from 'express';
const router = Router();

import { signIn, signUp } from '../controllers/user.controller';

router.post('/api/signup', signUp);
router.post('/api/signin', signIn);

export default router;
