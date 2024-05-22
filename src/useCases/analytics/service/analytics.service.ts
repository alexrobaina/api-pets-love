// src/useCases/analyticsCase/analytics.service.ts
import { prisma } from '../../../database/prisma'

export const getPetAnalytics = async (userId: string) => {
  // Total pets where the user is the owner in any capacity
  const totalPets = await prisma.pet.count({
    where: {
      OR: [
        { createdBy: userId },
        { adoptedBy: userId },
        { vetId: userId },
        { shelterId: userId },
      ],
    },
  })

  // Adopted pets where the user is the owner in any capacity
  const adoptedPets = await prisma.pet.count({
    where: {
      adopted: true,
      OR: [
        { createdBy: userId },
        { adoptedBy: userId },
        { vetId: userId },
        { shelterId: userId },
      ],
    },
  })

  const petsInAdoption = totalPets - adoptedPets

  return {
    totalPets,
    adoptedPets,
    petsInAdoption,
  }
}
