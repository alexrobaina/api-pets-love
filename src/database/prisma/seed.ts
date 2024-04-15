import { PrismaClient, VaccineStatus } from '@prisma/client'
import { createPets } from './utils/createPets'
import { createVaccines } from './utils/createVaccines'
import { createUsers } from './utils/createUsers'

const prisma = new PrismaClient()

async function main() {
  await createUsers()

  await createPets()

  const pets = await prisma.pet.findMany({})

  await createVaccines()

  const dogVaccine = await prisma.vaccine.findMany({
    where: {
      category: 'dog',
    },
  })

  const catVaccine = await prisma.vaccine.findMany({
    where: {
      category: 'cat',
    },
  })

  const dogVaccineId = dogVaccine.map((vaccine) => vaccine.id)
  const catVaccineId = catVaccine.map((vaccine) => vaccine.id)

  const catVaccineData = catVaccineId.map((vaccineId) => ({
    vaccineId: vaccineId,
    status: VaccineStatus.PENDING,
  }))

  const dogsVaccineData = dogVaccineId.map((vaccineId) => ({
    vaccineId: vaccineId,
    status: VaccineStatus.PENDING,
  }))

  for (let i = 0; i < pets.length; i++) {
    if (pets[i].category === 'cat') {
      for (let i = 0; i < catVaccineData.length; i++) {
        await prisma.petVaccine.create({
          data: {
            petId: pets[i].id,
            status: catVaccineData[i].status,
            vaccineId: catVaccineData[i].vaccineId,
          },
        })
      }
    }
  }

  for (let i = 0; i < pets.length; i++) {
    if (pets[i].category === 'dog') {
      for (let i = 0; i < dogsVaccineData.length; i++) {
        await prisma.petVaccine.create({
          data: {
            vaccineId: dogsVaccineData[i].vaccineId,
            status: dogsVaccineData[i].status,
            petId: pets[i].id,
          },
        })
      }
    }
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => {
    prisma.$disconnect()
  })
