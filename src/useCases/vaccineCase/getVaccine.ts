import { Response, Request } from 'express'
import { SOMETHING_IS_WRONG, SUCCESS_RESPONSE } from '../../constants/constants'
import { prisma } from '../../database/prisma'

export const getVaccine = async (req: Request, res: Response) => {
  const { category } = req.query
  try {
    const vaccines = await prisma.vaccine.findMany({
      where: {
        category: category as string,
      },
    })

    res.status(200).json({
      ok: true,
      vaccines,
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
