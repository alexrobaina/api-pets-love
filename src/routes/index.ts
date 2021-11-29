import routerx from 'express-promise-router';
import userRoutes from './user';

const router = routerx();

router.use('/api/v1', userRoutes);

export default router;
