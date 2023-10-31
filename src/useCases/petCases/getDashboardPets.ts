import { Request, Response } from 'express'
import { SUCCESS_RESPONSE, SOMETHING_IS_WRONG } from '../../constants/constants'
import { prisma } from '../../database/prisma'
import { ROLES } from '../../database/constants/roles'
import {
  addFiltersToQuery,
  buildBaseQuery,
  buildVolunteerQuery,
  filterBasedOnRole,
} from './utils/getDashboardPets'

//=====================================
//        READ LIST PETS = GET
//=====================================

export const getDashboardPets = async (req: Request, res: Response) => {
  const filter = req.query as any
  const userId = (req.user as { id: string })?.id
  const user = await prisma.user.findUnique({ where: { id: userId } })

  let query: any = buildBaseQuery(filter.page)
  query = filterBasedOnRole(query, user)
  query = addFiltersToQuery(query, filter)

  query.where.createdBy = user?.id

  try {
    if (user?.role === ROLES.VOLUNTEER) {
      const volunteerQuery = buildVolunteerQuery(user, filter)

      const petsCaredByVolunteer = await prisma.petsCaredByVolunteer.findMany({
        ...volunteerQuery,
        select: { pet: true },
      })
      const countPets = await prisma.petsCaredByVolunteer.count(volunteerQuery)

      return res.status(200).json({
        pets: petsCaredByVolunteer.map((pet: any) => pet.pet),
        ok: true,
        total: countPets,
        message: SUCCESS_RESPONSE,
      })
    }

    const pets = await prisma.pet.findMany(query)
    const countPets = await prisma.pet.count({ where: query.where })

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
