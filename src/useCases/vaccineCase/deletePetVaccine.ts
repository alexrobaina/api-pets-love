import { Response, Request } from 'express'
import { SOMETHING_IS_WRONG, SUCCESS_RESPONSE } from '../../constants/constants'
import { prisma } from '../../database/prisma'
import { deleteFiles } from '../../services/deleteFiles'

export const deletePetVaccine = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const petVaccine = await prisma.petVaccine.findMany({
      where: {
        id: id as string,
      },
    })

    if (!petVaccine) {
      return res.status(404).json({
        ok: false,
        message: 'Pet vaccine not found',
      })
    }

    petVaccine[0]?.files.length > 0 &&
      (await deleteFiles(petVaccine[0]?.files, req.originalUrl))

    await prisma.petVaccine.delete({
      where: {
        id: id as string,
      },
    })

    res.status(200).json({
      ok: true,
      petVaccine,
      message: SUCCESS_RESPONSE,
    })
  } catch (error) {
    if (error) {
      console.log(error)

      return res.status(500).json({
        code: 4,
        ok: false,
        error: Error,
        message: SOMETHING_IS_WRONG,
      })
    }
  }
}
