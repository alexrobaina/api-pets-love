import { Response, Request } from 'express'
import { SOMETHING_IS_WRONG, SUCCESS_RESPONSE } from '../../constants/constants'
import { prisma } from '../../database/prisma'
import { googleCloudDeleted } from '../../services/googleCloudDeleted'

export const deleteMedicalRecord = async (req: Request, res: Response) => {
  try {
    const { id } = req?.params as any

    const medicalRecord = await prisma.medicalRecord.findUnique({
      where: { id },
    })

    if (!medicalRecord)
      return res.status(404).json({
        ok: false,
        message: 'Medical record not found!',
      })

    if (medicalRecord?.attachments?.length ?? 0 > 0)
      googleCloudDeleted(medicalRecord?.attachments || [])

    await prisma.medicalRecord.delete({
      where: { id },
    })

    res.status(200).json({
      ok: true,
      message: SUCCESS_RESPONSE,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      error,
      ok: false,
      message: SOMETHING_IS_WRONG,
    })
  }
}
