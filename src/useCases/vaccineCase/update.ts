import { Response, Request } from 'express'
import { SOMETHING_IS_WRONG, SUCCESS_RESPONSE } from '../../constants/constants'
import { prisma } from '../../database/prisma'

export const update = async (req: Request, res: Response) => {
  const { id } = req.params
  let files
  const oldFiels = req.body?.oldFiles || []

  if (res.locals.file?.files?.url)
    files = [...oldFiels, res.locals.file?.files?.url]
  if (res.locals.file?.files?.urls)
    files = [...oldFiels, ...res.locals.file?.files?.urls]

  files = files && files.filter((item: string) => item !== '')

  try {
    const vaccines = await prisma.petVaccine.update({
      where: {
        id: id as string,
      },
      data: {
        status: req.body.status,
        files,
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
