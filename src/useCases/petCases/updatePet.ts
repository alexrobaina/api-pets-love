import { Response, Request } from 'express'
import { SOMETHING_IS_WRONG, SUCCESS_RESPONSE } from '../../constants/constants'
import { prisma } from '../../database/prisma'
import { deleteFiles } from '../../services/deleteFiles'

//=====================================
//       UPDATE Pet ID = PUT
//=====================================

export const update = async (req: Request, res: Response) => {
  let newPet: any = {}
  const { petId: id } = req.params

  try {
    delete req.body.newImages
    delete req.body.units

    const imagesJson = req.body.images // Get the 'images' field from the request body
    if (!imagesJson) {
      return res.status(400).json({
        ok: false,
        message: 'The "images" field is missing in the request body.',
      })
    }

    let images
    try {
      images = JSON.parse(imagesJson) // Parse the 'images' field as JSON
    } catch (error) {
      return res.status(400).json({
        ok: false,
        message: 'The "images" field is not a valid JSON string.',
      })
    }

    const { deletedUrls, notDeletedUrls } = splitImagesByDeleted(images)

    if (deletedUrls.length > 0) {
      deleteFiles(deletedUrls, req.originalUrl)
    }

    newPet = cleanData({
      ...req.body,
    })

    const existingPet = await prisma.pet.findUnique({
      where: { id },
    })

    setPetVaccines({
      petId: id,
      newCategory: newPet.category,
      oldCategory: existingPet?.category || '',
    })

    if (!existingPet)
      return res.status(404).json({ ok: false, message: 'Pet not found!' })

    newPet.images = notDeletedUrls

    if (newPet.adoptedBy) newPet.adopted = true
    if (!newPet.adoptedBy) newPet.adopted = false

    if (res.locals.file?.newImages?.url)
      newPet.images.push(res.locals.file.newImages.url)
    if (res.locals.file?.newImages?.urls)
      newPet.images = [...notDeletedUrls, ...res.locals.file?.newImages?.urls]

    const pet = await prisma.pet.update({
      where: { id },
      data: {
        ...newPet,
      },
    })

    if (!id)
      return res
        .status(400)
        .json({ ok: false, message: 'User ID is required!' })

    res.status(200).json({
      pet,
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
    // Check for string 'null' in specific keys
    if (
      (key === 'adoptedBy' || key === 'vetId' || key === 'shelterId') &&
      value === 'null'
    ) {
      value = null
    } else if (value === '') {
      // Skip empty string values
      continue
    } else if (typeof value === 'object' && !Array.isArray(value)) {
      // Recursively clean nested objects
      value = cleanData(value)
    }

    // Handle the images key separately if needed
    if (key === 'images') {
      newObj[key] = [] // Assuming you want to reset images to an empty array
    } else {
      newObj[key] = value
    }
  }

  // Delete keys as needed
  delete newObj.newImages
  delete newObj.deleteFiles

  return newObj
}

const setPetVaccines = async ({
  petId,
  oldCategory,
  newCategory,
}: {
  petId: string
  oldCategory: string
  newCategory: string
}) => {
  if (oldCategory !== newCategory) {
    await prisma.petVaccine.deleteMany({
      where: { petId },
    })

    if (newCategory !== oldCategory) {
      if (newCategory === 'dog') {
        const dogVaccines = await prisma.vaccine.findMany({
          where: {
            category: 'dog',
          },
        })

        dogVaccines.map(async (vaccine) => {
          await prisma.petVaccine.create({
            data: {
              petId,
              vaccineId: vaccine.id,
            },
          })
        })
      }
      if (newCategory === 'cat') {
        const dogVaccines = await prisma.vaccine.findMany({
          where: {
            category: 'cat',
          },
        })

        dogVaccines.map(async (vaccine) => {
          await prisma.petVaccine.create({
            data: {
              petId,
              vaccineId: vaccine.id,
            },
          })
        })
      }
    }
  }
}

interface Image {
  url: string
  isDeleted: boolean
  isNew: boolean
}

export const splitImagesByDeleted = (
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
