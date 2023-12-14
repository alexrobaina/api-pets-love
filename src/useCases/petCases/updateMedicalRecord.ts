import { Response, Request } from 'express'
import { SOMETHING_IS_WRONG, SUCCESS_RESPONSE } from '../../constants/constants'
import { prisma } from '../../database/prisma'
import { googleCloudDeleted } from '../../services/googleCloudDeleted'

export const updateMedicalRecord = async (req: Request, res: Response) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({ ok: false, message: 'User ID is required!' })
  }

  try {
    let attachments
    try {
      attachments = req.body?.attachments && JSON.parse(req.body.attachments) // Parse the 'attachments' field as JSON
    } catch (error) {
      return res.status(400).json({
        ok: false,
        message: 'The "attachments" field is not a valid JSON string.',
      })
    }

    const { deletedUrls, notDeletedUrls } = splitImagesByDeleted(attachments)

    if (deletedUrls.length > 0) {
      googleCloudDeleted(deletedUrls)
    }

    const medicalRecordUpdated = cleanData({
      ...req.body,
      attachments: notDeletedUrls,
    })

    const medicalRecordExisting = await prisma.medicalRecord.findUnique({
      where: { id },
    })

    if (!medicalRecordExisting) {
      return res.status(404).json({ ok: false, message: 'Pet not found!' })
    }

    if (res.locals.file?.newAttachments?.url) {
      medicalRecordUpdated.attachments.push(res.locals.file.newAttachments.url)
    }
    if (res.locals.file?.newAttachments?.urls) {
      medicalRecordUpdated.attachments = [
        ...medicalRecordUpdated.attachments,
        ...res.locals.file?.newAttachments?.urls,
      ]
    }

    const medicalRecord = await prisma.medicalRecord.update({
      where: { id },
      data: medicalRecordUpdated,
    })

    res.status(200).json({
      medicalRecord,
      ok: true,
      message: SUCCESS_RESPONSE,
    })
  } catch (error) {
    console.log(error)

    res.status(500).json({
      ok: true,
      message: SOMETHING_IS_WRONG,
    })
  }
}

const cleanData = (obj: Record<string, any>): Record<string, any> => {
  const newObj: Record<string, any> = {}

  for (let [key, value] of Object.entries(obj)) {
    if (key === 'id' || key === 'followUpRequired' || key === 'followUpDate')
      continue

    if (
      value === '' ||
      value === null ||
      value === 'null' ||
      value === undefined
    ) {
      newObj[key] = null
      continue
    }

    if (key === 'vetId' && value === 'null') {
      newObj[key] = null
      continue
    }

    if (key === 'vetId' && value === 'null') {
      newObj[key] = null
      continue
    }

    newObj[key] =
      typeof value === 'object' && !Array.isArray(value)
        ? cleanData(value)
        : value
  }

  if (newObj.newAttachments) delete newObj.newAttachments
  if (newObj.deleteAttachments) delete newObj.deleteAttachments
  console.log(1, newObj)

  return newObj
}

interface Image {
  url: string
  isDeleted: boolean
  isNew: boolean
}

const splitImagesByDeleted = (
  images: Image[],
): {
  deletedUrls: string[]
  notDeletedUrls: string[]
} => {
  const deletedUrls: string[] = []
  const notDeletedUrls: string[] = []

  for (const image of images) {
    if (!image.isNew) {
      if (image.isDeleted) {
        deletedUrls.push(image.url)
      } else {
        notDeletedUrls.push(image.url)
      }
    }
  }

  return { deletedUrls, notDeletedUrls }
}
