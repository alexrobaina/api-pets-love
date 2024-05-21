// src/routes/appointment.routes.ts
import express from 'express'
import * as appointmentController from '../useCases/appointmentCase/appointment.controller'
import { verifyToken } from '../middlewares/auth'
import { validateAppointments } from '../middlewares/validations/validateAppointments'

const router = express.Router()

router.post(
  '/appointments/',
  verifyToken,
  appointmentController.createAppointment,
)
router.get(
  '/appointments/:id',
  verifyToken,
  appointmentController.getAppointmentById,
)
router.put(
  '/appointments/:id',
  verifyToken,
  validateAppointments,
  appointmentController.updateAppointment,
)
router.delete(
  '/appointments/:id',
  verifyToken,
  appointmentController.deleteAppointment,
)
router.get(
  '/appointments/',
  verifyToken,
  appointmentController.listAppointments,
)

export default router
