import QRCode, { QRCodeErrorCorrectionLevel } from 'qrcode'
import { Response, Request } from 'express'
import { SOMETHING_IS_WRONG, SUCCESS_RESPONSE } from '../../constants/constants'
import { prisma } from '../../database/prisma'
import { ROLES } from '../../database/constants/roles'
import { uploadImage } from '../../services/uploadImage'

//=====================================
//           CREATE USER = POST
//=====================================

export const create = async (req: Request, res: Response) => {
  try {
    const cleanedData = cleanData({
      ...req.body,
    })

    if (res.locals.file?.newImages?.url)
      cleanedData.images = [res.locals.file.newImages?.url]
    if (res.locals.file?.newImages?.urls)
      cleanedData.images = res.locals.file.newImages?.urls

    if (cleanedData.adoptedBy) cleanedData.adopted = true

    cleanedData.createdBy = (req.user as { id: string })?.id

    const user = await prisma.user.findUnique({
      where: { id: (req.user as any)?.id },
    })

    if (user?.role === ROLES.SHELTER) {
      cleanedData.shelterId = user.id
    }

    if (user?.role === ROLES.ADOPTER) {
      cleanedData.adoptedBy = user.id
    }

    const data: any = { ...cleanedData }

    const dogVaccines = await prisma.vaccine.findMany({
      where: {
        category: 'dog',
      },
    })
    const catVaccines = await prisma.vaccine.findMany({
      where: {
        category: 'cat',
      },
    })

    const pet = await prisma.pet.create({
      data,
    })

    if (cleanedData.category === 'dog') {
      dogVaccines.map(async (vaccine) => {
        await prisma.petVaccine.create({
          data: {
            petId: pet.id,
            vaccineId: vaccine.id,
          },
        })
      })
    }

    if (cleanedData.category === 'cat') {
      catVaccines.map(async (vaccine) => {
        await prisma.petVaccine.create({
          data: {
            petId: pet.id,
            vaccineId: vaccine.id,
          },
        })
      })
    }

    const qrCodeText = `${process.env.HOST}/pet/${pet.id}`
    const qrCode = await generateQRCodeDataURL(qrCodeText)

    const base64Image = qrCode
    const base64Data = base64Image.split(',')[1]
    const imageBuffer = Buffer.from(base64Data, 'base64')

    const imageUrl = await uploadImage(
      process.env.BUCKET_NAME || '',
      imageBuffer,
      'image/png',
      'qrCode',
    )

    const petUpdated = await prisma.pet.update({
      where: { id: pet.id },
      data: { qrCode: imageUrl },
    })

    res.status(201).json({
      pet: petUpdated,
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
    if (key === 'images') if (value == '{}') continue
    if (key === 'qrCodeImage') continue
    if (key === 'string') continue
    if (key === 'newImages') continue
    if (key === 'name') value = value.toLowerCase()

    newObj[key] =
      typeof value === 'object' && !Array.isArray(value)
        ? cleanData(value)
        : value
  }

  return newObj
}

const generateQRCodeDataURL = async (text: string) => {
  try {
    const options = {
      errorCorrectionLevel: 'M' as QRCodeErrorCorrectionLevel,
      scale: 60, // Large scale to create a high-resolution image
      width: 200,
      height: 200,
      color: {
        dark: '#369683', // QR code dots color
        light: '#f3faf8', // Transparent background, in this case white
      },
    }

    const dataURL = await QRCode.toDataURL(text, options)

    return dataURL
  } catch (err) {
    console.error(err)
    return ''
  }
}
