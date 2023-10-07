import { Response, Request } from 'express'
import { SOMETHING_IS_WRONG, SUCCESS_RESPONSE } from '../../constants/constants'
import { prisma } from '../../database/prisma'

export const deletePet = async (req: Request, res: Response) => {
  const { petId, userRole } = req?.query as any
  try {
    if (userRole === 'VOLUNTEER') {
      await prisma.petsCaredByVolunteer.deleteMany({
        where: { petId },
      })
    }
    console.log('petId', petId)

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
