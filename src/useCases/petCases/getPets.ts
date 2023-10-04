import { Request, Response } from 'express'
import { SUCCESS_RESPONSE, SOMETHING_IS_WRONG } from '../../constants/constants'
import { prisma } from '../../database/prisma'

//=====================================
//        READ LIST PETS = GET
//=====================================

export const getPets = async (req: Request, res: Response) => {
  const filter = req.query as {
    gender: string
    adopted: string
    searchByName: string
    category?: string
    skip?: string
    take?: string
  }

  const query: any = {
    where: {},
    skip: filter.skip ? parseInt(filter.skip, 10) : 0, // Skip the specified number of records
    take: filter.take ? parseInt(filter.take, 10) : 10, // Take the specified number of records
    orderBy: { createdAt: 'desc' },
    include: {
      Shelter: {
        select: {
          id: true,
          username: true,
          image: true,
          location: true,
        },
      },
    },
  }

  if (filter.category) query.where.category = filter.category
  if (filter.gender) query.where.gender = filter.gender
  if (filter.adopted) query.where.adopted = filter.adopted === 'true'
  if (filter.searchByName)
    query.where.name = { contains: filter.searchByName as string }

  try {
    const pets = await prisma.pet.findMany(query)
    const countPets = await prisma.pet.count({
      where: query.where, // Count pets matching the filters
    })

    res.status(200).json({
      pets,
      ok: true,
      total: countPets,
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

//=====================================
//        READ ONE PET ID = GET
//=====================================

export const getPet = async (_req: Request, res: Response) => {
  try {
    res.status(200).json({
      ok: true,
      message: SUCCESS_RESPONSE,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      ok: true,
      message: SOMETHING_IS_WRONG,
      error,
    })
  }
}
