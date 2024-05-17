// src/controllers/appointment.controller.ts
import e, { Request, Response } from 'express'
import * as appointmentService from './services/appointment.service'

export const createAppointment = async (req: any, res: Response) => {
  const ownerId = req?.user?.id as string
  try {
    const appointment = await appointmentService.createAppointment(
      req.body,
      ownerId,
    )
    res.status(201).json(appointment)
  } catch (error: any) {
    console.log(error)
    res.status(500).json({ error: error.message })
  }
}

export const updateAppointment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const appointment = await appointmentService.updateAppointment(id, req.body)
    res.status(200).json(appointment)
  } catch (error: any) {
    console.log(error)
    res.status(500).json({ error: error.message })
  }
}

export const deleteAppointment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const appointment = await appointmentService.deleteAppointment(id)
    res.status(200).json(appointment)
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}

export const getAppointmentById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const appointment = await appointmentService.getAppointmentById(id)
    res.status(200).json(appointment)
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}

export const listAppointments = async (req: any, res: Response) => {
  const userId = req?.user?.id as string
  const query = {
    where: {
      OR: [
        {
          ownerId: userId,
        },
        {
          recipientId: userId,
        },
      ],
    },
    include: {
      pet: true,
    },
  }

  try {
    const appointments = await appointmentService.listAppointments(query)
    res.status(200).json(appointments)
  } catch (error: any) {
    console.log(error)

    res.status(400).json({ error: error.message })
  }
}
