import { Response, Request } from 'express'
import { SOMETHING_IS_WRONG, SUCCESS_RESPONSE } from '../../constants/constants'
import { prisma } from '../../database/prisma'
import { googleCloudDeleted } from '../../services/googleCloudDeleted'

export const deletePet = async (req: Request, res: Response) => {
  try {
    const { petId } = req?.params as any

    const pet = await prisma.pet.findUnique({
      where: { id: petId as string },
    })

    if (pet?.images?.length ?? 0 > 0) googleCloudDeleted(pet?.images || [])

    const petVaccine = await prisma.petVaccine.findMany({
      where: { petId: petId as string },
    })

    petVaccine?.forEach((vaccine) => {
      if (vaccine?.files?.length ?? 0 > 0)
        googleCloudDeleted(vaccine?.files || [])
    })

    googleCloudDeleted(pet?.qrCode as string)

    await prisma.petVaccine.deleteMany({
      where: { petId: petId as string },
    })

    await prisma.medicalRecord.deleteMany({
      where: { petId: petId as string },
    })

    if (pet?.createdBy !== (req.user as any)?.id)
      return res.status(401).json({
        ok: false,
        message: 'You can not delete this pet',
      })

    if (petId)
      await prisma.pet.delete({
        where: { id: petId as string },
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
