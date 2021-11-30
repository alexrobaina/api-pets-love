import routerx from 'express-promise-router';
import userRoutes from './user';
import petRoutes from './pet';

const router = routerx();

router.use('/api/v1', userRoutes, petRoutes);

export default router;
