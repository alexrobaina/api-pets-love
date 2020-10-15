import { Router } from 'express';
const router = Router();

import { forgotPassword } from '../controllers/forgotPassword.controler';

router.post('/forgotPassword', forgotPassword);

export default router;
