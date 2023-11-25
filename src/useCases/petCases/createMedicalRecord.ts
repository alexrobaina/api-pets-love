import { Response, Request } from 'express'
import { SOMETHING_IS_WRONG, SUCCESS_RESPONSE } from '../../constants/constants'
import { prisma } from '../../database/prisma'

//=====================================
//           CREATE USER = POST
//=====================================

export const createMedicalRecord = async (req: Request, res: Response) => {
  try {
    console.log('req.body', req.body)

    const cleanedData = cleanData({
      ...req.body,
    })

    if (res.locals.file?.newAttachments?.url)
      cleanedData.attachments = [res.locals.file.newAttachments?.url]
    if (res.locals.file?.newAttachments?.urls)
      cleanedData.attachments = res.locals.file.newAttachments?.urls

    const data: any = { ...cleanedData }

    await prisma.medicalRecord.create({
      data,
    })

    res.status(201).json({
      ok: true,
      message: SUCCESS_RESPONSE,
    })
  } catch (error) {
    if (error) {
      console.log(error)
      res.status(500).json({
        ok: false,
        error: Error,
        message: SOMETHING_IS_WRONG,
      })
    }
  }
}

const cleanData = (obj: Record<string, any>): Record<string, any> => {
  const newObj: Record<string, any> = {}

  for (let [key, value] of Object.entries(obj)) {
    if (value === '' || value === null || value === undefined) continue
    if (key === 'attachments') continue
    if (key === 'newAttachments') continue

    newObj[key] =
      typeof value === 'object' && !Array.isArray(value)
        ? cleanData(value)
        : value
  }

  return newObj
}
