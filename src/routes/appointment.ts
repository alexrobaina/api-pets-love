// src/routes/appointment.routes.ts
import express from 'express'
import * as appointmentController from '../useCases/appointmentCase/appointment.controller'
import { verifyToken } from '../middlewares/auth'
import { validateAppointments } from '../middlewares/validations/validateAppointments'

const router = express.Router()

router.post('/', verifyToken, appointmentController.createAppointment)
router.get('/:id', verifyToken, appointmentController.getAppointmentById)
router.put(
  '/:id',
  verifyToken,
  validateAppointments,
  appointmentController.updateAppointment,
)
router.delete('/:id', verifyToken, appointmentController.deleteAppointment)
router.get('/', verifyToken, appointmentController.listAppointments)

export default router
