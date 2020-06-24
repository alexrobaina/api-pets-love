import routerx from 'express-promise-router';
import authRouter from './auth.routes';
import petRouter from './pet.routes';
import privateRouter from './private.routes';

const router = routerx();

router.use('', authRouter);

export default router;
