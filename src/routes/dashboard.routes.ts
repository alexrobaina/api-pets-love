import { Router } from 'express';
const router = Router();

import { getDashboard } from '../controllers/dashboard.controller';

router.get('/dashboard', getDashboard);

export default router;
