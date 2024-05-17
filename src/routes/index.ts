import routerx from 'express-promise-router'
import userRoutes from './user'
import authRoutes from './auth'
import petRoutes from './pet'
import productRoutes from './product'
import seedRoutes from './seed'
import vaccineRoutes from './vaccine'
import appointmentsRoutes from './appointment'

const router = routerx()

router.use('/api/v1', userRoutes, petRoutes, productRoutes, vaccineRoutes)
router.use('/api/auth', authRoutes)
router.use('/api/seed', seedRoutes)
router.use('/api/v1/appointments', appointmentsRoutes)

export default router
