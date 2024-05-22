// src/routes/index.ts
import express from 'express'
import { getAnalytics } from '../useCases/analytics/analytics.controller'

const router = express.Router()

router.get('/analytics/:userId', getAnalytics)

export default router
