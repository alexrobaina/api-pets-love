import { prisma } from '../../prisma'

export const createVaccines = async () => {
  await prisma.vaccine.createMany({
    data: [
      {
        name: 'FVRCP',
        category: 'cat',
        description:
          'Feline Viral Rhinotracheitis, Calicivirus, and Panleukopenia',
      },
      {
        name: 'Rabies',
        category: 'cat',
        description: 'Vaccine for Rabies virus',
      },
      {
        name: 'Feline Leukemia (FeLV)',
        category: 'cat',
        description: 'Vaccine for Feline Leukemia Virus',
      },
      {
        name: 'FIP',
        category: 'cat',
        description: 'Feline Infectious Peritonitis',
      },
      {
        name: 'Bordetella',
        category: 'cat',
        description: 'Vaccine for Bordetella bronchiseptica',
      },
      {
        name: 'Chlamydophila Felis',
        category: 'cat',
        description:
          'Vaccine for Chlamydophila (previously known as Chlamydia)',
      },
      {
        name: 'FIV',
        category: 'cat',
        description: 'Feline Immunodeficiency Virus (not always recommended)',
      },
    ],
  })

  await prisma.vaccine.createMany({
    data: [
      {
        name: 'DHPP',
        category: 'dog',
        description: 'Distemper, Hepatitis, Parainfluenza, and Parvovirus',
      },
      {
        name: 'Rabies',
        category: 'dog',
        description: 'Vaccine for the Rabies virus',
      },
      {
        name: 'Leptospirosis',
        category: 'dog',
        description: 'Vaccine for the Leptospira bacteria',
      },
      {
        name: 'Bordetella',
        category: 'dog',
        description: 'Kennel Cough or Bordetella bronchiseptica vaccine',
      },
      {
        name: 'Lyme Disease',
        category: 'dog',
        description:
          'Vaccine for Borrelia burgdorferi, which causes Lyme disease',
      },
      {
        name: 'Canine Influenza',
        category: 'dog',
        description: 'Vaccine for the dog flu',
      },
      {
        name: 'Coronavirus',
        category: 'dog',
        description:
          'Vaccine for the canine coronavirus (not related to COVID-19)',
      },
    ],
  })
}
