import express from 'express';
import { oauth } from '../useCases/authCase/oauth';
import { login } from '../useCases/authCase/login';
import { googleAuth } from '../useCases/authCase/callback';
import { verifyToken } from '../middlewares/auth';

const router = express.Router();

router.get('/login/', [verifyToken], login);
router.get('/google/', oauth);
router.get('/callback/google', googleAuth);

export default router;
