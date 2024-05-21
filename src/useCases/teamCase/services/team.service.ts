import { PrismaClient, Team, TeamMembership } from '@prisma/client'

const prisma = new PrismaClient()

export const createTeam = async (
  data: Omit<Team, 'id' | 'createdAt' | 'updatedAt'>,
  createdBy: string,
): Promise<Team> => {
  return prisma.team.create({
    data: {
      ...data,
      createdBy,
    },
  })
}

export const updateTeam = async (
  id: string,
  data: Partial<Team>,
): Promise<Team | null> => {
  return prisma.team.update({
    where: { id },
    data,
  })
}

export const deleteTeam = async (id: string): Promise<Team | null> => {
  return prisma.team.delete({
    where: { id },
  })
}

export const getTeamById = async (id: string): Promise<Team | null> => {
  return prisma.team.findUnique({
    where: { id },
    include: { members: true },
  })
}

export const listTeamsByUser = async (userId: string): Promise<Team[]> => {
  return prisma.team.findMany({
    where: {
      OR: [
        {
          createdBy: userId,
        },
        {
          members: {
            some: {
              userId: userId,
            },
          },
        },
      ],
    },
    include: {
      members: {
        select: {
          role: true,
          user: {
            select: {
              id: true,
              email: true,
              username: true,
              firstName: true,
              lastName: true,
            },
          },
        },
      },
    },
  })
}

export const listTeams = async (): Promise<Team[]> => {
  return prisma.team.findMany({
    include: {
      members: {
        select: {
          role: true,
          user: {
            select: {
              email: true,
              username: true,
              firstName: true,
              lastName: true,
            },
          },
        },
      },
    },
  })
}

export const addMember = async (
  teamId: string,
  userId: string,
  role: 'MEMBER' | 'ADMIN',
): Promise<TeamMembership> => {
  return prisma.teamMembership.create({
    data: {
      teamId,
      userId,
      role,
    },
  })
}

export const removeMember = async (
  teamId: string,
  userId: string,
): Promise<void> => {
  await prisma.teamMembership.delete({
    where: {
      teamId_userId: {
        teamId,
        userId,
      },
    },
  })
}

export const isUserMemberOfPetCreatorTeam = async (
  userId: string,
  petId: string,
): Promise<boolean> => {
  // Find the pet and include the fields that may relate to teams
  const pet = await prisma.pet.findUnique({
    where: { id: petId },
  })

  if (!pet) {
    return false
  }

  const creatorIds = [
    pet.adoptedBy,
    pet.shelterId,
    pet.vetId,
    pet.createdBy,
  ].filter(Boolean) as string[]

  if (creatorIds.length === 0) {
    return false
  }

  const teams = await prisma.team.findMany({
    where: {
      createdBy: { in: creatorIds },
      members: {
        some: {
          userId: userId,
        },
      },
    },
  })

  return teams.length > 0
}
