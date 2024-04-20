import QRCode, { QRCodeErrorCorrectionLevel } from 'qrcode'
import { Response, Request } from 'express'
import { SOMETHING_IS_WRONG, SUCCESS_RESPONSE } from '../../constants/constants'
import { prisma } from '../../database/prisma'

//=====================================
//           CREATE USER = POST
//=====================================

export const createVaccines = async (req: Request, res: Response) => {
  try {
    await prisma.vaccine.createMany({
      data: [
        {
          name: 'vaccine.cat.FVRCP.name',
          category: 'cat',
          description: 'vaccine.cat.FVRCP.description'  
        },
        {
          name: 'vaccine.cat.rabies.name',
          category: 'cat',
          description: 'vaccine.cat.rabies.description'
        },
        {
          name: 'vaccine.cat.FeLV.name',
          category: 'cat',
          description: 'vaccine.cat.FeLV.description'
        },
        {
          name: 'vaccine.cat.FIP.name',
          category: 'cat',
          description: 'vaccine.cat.FIP.description'
        },
        {
          name: 'vaccine.cat.bordetella.name',
          category: 'cat',
          description: 'vaccine.cat.bordetella.description'
        },
        {
          name: 'vaccine.cat.chlamydophilaFelis.name',
          category: 'cat',
          description: 'vaccine.cat.chlamydophilaFelis.description'
        },
        {
          name: 'vaccine.cat.FIV.name',
          category: 'cat',
          description: 'vaccine.cat.FIV.description'
        },
      ],
    })
  
    await prisma.vaccine.createMany({
      data: [
        {
          name: 'vaccine.dog.DHPP.name',
          category: 'dog',
          description: 'vaccine.dog.DHPP.description'  
        },
        {
          name: 'vaccine.dog.rabies.name',
          category: 'dog',
          description: 'vaccine.dog.rabies.description'
        },
        {
          name: 'vaccine.dog.leptospirosis.name',
          category: 'dog',
          description: 'vaccine.dog.leptospirosis.description'
        },
        {
          name: 'vaccine.dog.bordetella.name',
          category: 'dog',
          description: 'vaccine.dog.bordetella.description'
        },
        {
          name: 'vaccine.dog.lymeDisease.name',
          category: 'dog',
          description: 'vaccine.dog.lymeDisease.description'
        },
        {
          name: 'vaccine.dog.canineInfluenza.name',
          category: 'dog',
          description: 'vaccine.dog.canineInfluenza.description'
        },
        {
          name: 'vaccine.dog.coronavirus.name',
          category: 'dog',
          description: 'vaccine.dog.coronavirus.description'
        },
      ],
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
