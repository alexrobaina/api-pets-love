import routerx from 'express-promise-router'
import userRoutes from './user'
import authRoutes from './auth'
import petRoutes from './pet'
import productRoutes from './product'
import seedRoutes from './seed'
import vaccineRoutes from './vaccine'
import appointmentsRoutes from './appointment'
import teamRoutes from './team'
import petAnalyticsRoutes from './petAnalytics'

const router = routerx()

router.use(
  '/api/v1',
  petRoutes,
  userRoutes,
  teamRoutes,
  productRoutes,
  vaccineRoutes,
  petAnalyticsRoutes,
  appointmentsRoutes,
)
router.use('/api/auth', authRoutes)
router.use('/api/seed', seedRoutes)

export default router
