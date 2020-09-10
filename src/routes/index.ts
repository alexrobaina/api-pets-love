import routerx from 'express-promise-router';
import authRouter from './auth.routes';
import petRouter from './pet.routes';

const router = routerx();

router.use('api', authRouter);

export default router;
