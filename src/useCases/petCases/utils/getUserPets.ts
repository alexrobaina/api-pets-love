import { Prisma, Role } from '@prisma/client'
import { ROLES } from '../../../database/constants/roles'

export const ITEMS_PER_PAGE = 10

interface IFilters {
  category: string
  shelterId: string
  adoptedBy: string
  gender: string
  adopted: string
  searchByName: string
}

interface User {
  id: string
  role: Role | null
  socialMedia: Prisma.JsonValue
  firstName: string | null
  lastName: string | null
  locationId: string | null
  image: string | null
  username: string | null
  email: string
  updatedAt: Date
  createdAt: Date
}

export const buildBaseQuery = (
  page: string,
): {
  where: {
    OR: {}
  }
  orderBy: { createdAt: string }
  skip: number
  take: number
  include: {
    Shelter: {
      select: {
        id: boolean
        username: boolean
        image: boolean
        email: boolean
        location: boolean
      }
    }
    Adopter: {
      select: {
        id: boolean
        username: boolean
        image: boolean
        email: boolean
        location: boolean
      }
    }
    location: boolean
  }
} => ({
  where: {
    OR: [],
  },
  orderBy: { createdAt: 'desc' },
  skip: (parseInt(page || '1') - 1) * ITEMS_PER_PAGE,
  take: ITEMS_PER_PAGE,
  include: {
    Shelter: {
      select: {
        id: true,
        username: true,
        image: true,
        email: true,
        location: true,
      },
    },
    Adopter: {
      select: {
        id: true,
        username: true,
        email: true,
        image: true,
        location: true,
      },
    },
    location: true,
  },
})

export const filterBasedOnRole = (
  query: {
    where: {
      shelterId: string
      adoptedBy: string
      OR: any[]
    }
  },
  user: User | null,
) => {
  if (user?.role === ROLES.ADOPTER) query.where.OR.push({ adoptedBy: user.id })
  if (user?.role === ROLES.SHELTER) query.where.OR.push({ shelterId: user.id })
  if (user?.role === ROLES.VET) query.where.OR.push({ vetId: user.id })
  if (user?.role) query.where.OR.push({ createdBy: user.id })

  return query
}

export const addFiltersToQuery = (query: any, filters: IFilters) => {
  const { category, gender, adopted, searchByName } = filters

  if (category) query.where.category = category
  if (gender) query.where.gender = gender
  if (adopted) query.where.adopted = adopted === 'true'
  if (searchByName) query.where.name = { contains: searchByName }

  return query
}

export const buildVolunteerQuery = (
  user: User | null,
  filters: {
    category: string
    shelterId: string
    adoptedBy: string
    gender: string
    adopted: string
    searchByName: string
  },
) => {
  let query: any = {
    where: {
      userId: user?.id,
      pet: {},
    },
  }

  const { category, shelterId, adoptedBy, gender, adopted, searchByName } =
    filters

  if (category) query.where.pet.category = category
  if (shelterId) query.where.pet.shelterId = shelterId
  if (adoptedBy) query.where.pet.adoptedBy = adoptedBy
  if (gender) query.where.pet.gender = gender
  if (adopted) query.where.pet.adopted = adopted === 'true'
  if (searchByName) query.where.pet.name = { contains: searchByName }

  return query
}
