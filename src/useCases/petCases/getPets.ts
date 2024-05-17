import {
  SOMETHING_IS_WRONG,
  SUCCESS_RESPONSE,
} from './../../constants/constants'
import { Request, Response } from 'express'

import { prisma } from '../../database/prisma'

//=====================================
//        READ LIST PETS = GET
//=====================================

export const getPets = async (req: Request, res: Response) => {
  const filter = req.query as {
    page?: string
    take?: string
    city?: string
    gender: string
    adopted: string
    country?: string
    category?: string
    searchByName: string
  }

  const itemsPerPage = 10
  const currentPage = parseInt(filter.page || '1')

  // Calculate skip and take based on currentPage
  const skip = (currentPage - 1) * itemsPerPage
  const take = itemsPerPage

  const query: any = {
    where: {},
    orderBy: { createdAt: 'desc' },
    skip,
    take,
    include: {
      Shelter: {
        select: {
          id: true,
          username: true,
          image: true,
          location: true,
          email: true,
        },
      },
      location: true,
    },
  }

  if (filter.category) query.where.category = filter.category
  if (filter.gender) query.where.gender = filter.gender
  if (filter.adopted) query.where.adopted = filter.adopted === 'true'
  if (filter.searchByName) {
    query.where.name = { contains: filter.searchByName }
  }

  if (filter.country || filter.city) {
    query.where.location = {}
    if (filter.city) {
      query.where.location.city = filter.city
    }
    if (filter.country) {
      query.where.location.country = filter.country
    }
  }

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

export const getPet = async (req: Request, res: Response) => {
  const pet = await prisma.pet.findUnique({
    where: {
      id: req.params.petId as string,
    },
    include: {
      Shelter: {
        select: {
          id: true,
          username: true,
          image: true,
          description: true,
          firstName: true,
          email: true,
          location: true,
          socialMedia: true,
        },
      },
      Adopter: {
        select: {
          id: true,
          username: true,
          image: true,
          firstName: true,
          description: true,
          email: true,
          location: true,
        },
      },
      PetVaccine: {
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          status: true,
          Vaccine: true,
          files: true,
        },
      },
      Vet: {
        select: {
          id: true,
          username: true,
          image: true,
          firstName: true,
          description: true,
          location: true,
          socialMedia: true,
        },
      },
      MedicalRecord: {
        select: {
          description: true,
          title: true,
          diagnosis: true,
          treatment: true,
          id: true,
          clinicName: true,
          createdAt: true,
          attachments: true,
        },
      },
    },
  })

  try {
    res.status(200).json({
      pet,
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
