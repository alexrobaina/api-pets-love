import { Request, Response } from 'express'
import { SUCCESS_RESPONSE, SOMETHING_IS_WRONG } from '../../constants/constants'
import { prisma } from '../../database/prisma'
import { config } from '../../config/config'

//=====================================
//        READ LIST USERS = GET
//=====================================

export const getUser = async (req: Request, res: Response) => {
  const id = req.query.id as string
  try {
    const user = await prisma.user.findMany({
      where: {
        id,
      },
      select: {
        id: true,
        email: true,
        image: true,
        role: true,
        username: true,
        lastName: true,
        location: true,
        firstName: true,
        locationId: true,
        socialMedia: true,
        description: true,
      },
    })

    if (user.length === 0) {
      if (!res.headersSent) {
        res.cookie('token', '')
        return res.redirect(config.HOST + '/login')
      }
    }
    res.status(200).json({
      user,
      ok: true,
      message: SUCCESS_RESPONSE,
    })
  } catch (error) {
    if (error) {
      console.log(error)
      return res.status(500).json({
        ok: false,
        message: SOMETHING_IS_WRONG,
        error,
      })
    }
  }
}
