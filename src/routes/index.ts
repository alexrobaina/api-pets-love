import routerx from 'express-promise-router';
import adopterRouter from './adopter.routes';
import authRouter from './auth.routes';
import dashboardRouter from './dashboard.routes';
import forgotPassword from './forgotPassword.routes';
import imageRouter from './image.routes';
import petRouter from './pet.routes';
import veterinaryRouter from './veterinary.routes';
import volunteersRouter from './volunteers.routes';

const router = routerx();

router.use('/api', adopterRouter);
router.use('/api', authRouter);
router.use('/api', dashboardRouter);
router.use('/api', forgotPassword);
router.use('/api', imageRouter);
router.use('/api', petRouter);
router.use('/api', veterinaryRouter);
router.use('/api', volunteersRouter);

export default router;
