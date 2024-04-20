import { prisma } from '../../prisma'

export const createVaccines = async () => {
  await prisma.vaccine.createMany({
    data: [
      {
        name: 'vaccine.cat.FVRCP.name',
        category: 'cat',
        description: 'vaccine.cat.FVRCP.description'  
      },
      {
        name: 'vaccine.cat.rabies.name',
        category: 'cat',
        description: 'vaccine.cat.rabies.description'
      },
      {
        name: 'vaccine.cat.FeLV.name',
        category: 'cat',
        description: 'vaccine.cat.FeLV.description'
      },
      {
        name: 'vaccine.cat.FIP.name',
        category: 'cat',
        description: 'vaccine.cat.FIP.description'
      },
      {
        name: 'vaccine.cat.bordetella.name',
        category: 'cat',
        description: 'vaccine.cat.bordetella.description'
      },
      {
        name: 'vaccine.cat.chlamydophilaFelis.name',
        category: 'cat',
        description: 'vaccine.cat.chlamydophilaFelis.description'
      },
      {
        name: 'vaccine.cat.FIV.name',
        category: 'cat',
        description: 'vaccine.cat.FIV.description'
      },
    ],
  })

  await prisma.vaccine.createMany({
    data: [
      {
        name: 'vaccine.dog.DHPP.name',
        category: 'dog',
        description: 'vaccine.dog.DHPP.description'  
      },
      {
        name: 'vaccine.dog.rabies.name',
        category: 'dog',
        description: 'vaccine.dog.rabies.description'
      },
      {
        name: 'vaccine.dog.leptospirosis.name',
        category: 'dog',
        description: 'vaccine.dog.leptospirosis.description'
      },
      {
        name: 'vaccine.dog.bordetella.name',
        category: 'dog',
        description: 'vaccine.dog.bordetella.description'
      },
      {
        name: 'vaccine.dog.lymeDisease.name',
        category: 'dog',
        description: 'vaccine.dog.lymeDisease.description'
      },
      {
        name: 'vaccine.dog.canineInfluenza.name',
        category: 'dog',
        description: 'vaccine.dog.canineInfluenza.description'
      },
      {
        name: 'vaccine.dog.coronavirus.name',
        category: 'dog',
        description: 'vaccine.dog.coronavirus.description'
      },
    ],
  })
}
