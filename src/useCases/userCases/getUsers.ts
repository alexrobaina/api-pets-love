import { Request, Response } from 'express'
import { SUCCESS_RESPONSE, SOMETHING_IS_WRONG } from '../../constants/constants'
import { prisma } from '../../database/prisma'

//=====================================
//        READ LIST USERS = GET
//=====================================

export const getUsers = async (req: Request, res: Response) => {
  const filter = req.query as {
    role?: 'VOLUNTEER' | 'VET' | 'SHELTER' | 'ADOPTER' | 'ADMIN' | ''
    country?: string
    city?: string
    skip?: string
    take?: string
  }

  const skip = filter.skip ? parseInt(filter.skip, 10) : 0
  const take = filter.take ? parseInt(filter.take, 10) : 10

  const query: any = {
    where: {},
    skip, // Skip the specified number of records
    take, // Take the specified number of records
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      email: true,
      username: true,
      image: true,
      role: true,
      socialMedia: true,
      location: true, // select related location
      volunteerPets: true, // select related volunteerPets
      adoptedPets: true, // select related adoptedPets
      caredPets: true, // select related caredPets
    },
  }

  if (filter.role) query.where.role = filter.role
  if (filter.country) query.where.location = { country: filter.country }
  if (filter.city) {
    if (!query.where.location) query.where.location = {}
    query.where.location.city = filter.city
  }

  try {
    const users = await prisma.user.findMany({
      where: query.where, // Count users matching the filters
    })
    const totalUsers = await prisma.user.count({
      where: query.where, // Count users matching the filters
    })

    res.status(200).json({
      users,
      ok: true,
      total: totalUsers,
      skip,
      take,
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
