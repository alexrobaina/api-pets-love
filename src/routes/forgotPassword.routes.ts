import { Router } from 'express';
const router = Router();

import { forgotPassword, resetPassWord } from '../controllers/forgotPassword.controler';

router.post('/forgotPassword', forgotPassword);
router.post('/resetPassword', resetPassWord);

export default router;
