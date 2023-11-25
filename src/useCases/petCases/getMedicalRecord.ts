import { Request, Response } from 'express'
import { SUCCESS_RESPONSE, SOMETHING_IS_WRONG } from '../../constants/constants'
import { prisma } from '../../database/prisma'

export const getMedicalRecord = async (req: Request, res: Response) => {
  const { id } = req.params

  const medicalRecord = await prisma.medicalRecord.findUnique({
    where: {
      id,
    },
  })

  try {
    res.status(200).json({
      medicalRecord,
      ok: true,
      message: SUCCESS_RESPONSE,
    })
  } catch (error) {
    if (error) {
      console.log(error)
      return res.status(500).json({
        ok: false,
        message: SOMETHING_IS_WRONG,
        error,
      })
    }
  }
}
