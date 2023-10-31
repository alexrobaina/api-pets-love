import { Role } from '@prisma/client'
import { prisma } from '../../prisma'

export const createUsers = async () => {
  const randomFirstNameIndex = Math.floor(Math.random() * firstNames.length)
  const randonLastNameIndex = Math.floor(Math.random() * lastNames.length)
  const randonImageIndex = Math.floor(Math.random() * userImages.length)

  await prisma.user.createMany({
    data: [
      {
        firstName: firstNames[randomFirstNameIndex],
        email: `${firstNames[randomFirstNameIndex]}1@example33.com`,
        image: userImages[randonImageIndex],
        lastName: lastNames[randonLastNameIndex],
        role: userRoles[0],
        socialMedia: {
          whatsapp: 'https://wa.me/1112412412',
          facebook: 'https://www.facebook.com/',
          instagram: 'https://www.instagram.com/',
          twitter: 'https://twitter.com/',
        },
        description:
          'Our shelter is a 501(c)3 non-profit organization dedicated to rescuing homeless, abandoned, abused, and neglected dogs and cats. We are a volunteer-driven group with a number of years of experience with animals and rescue. We have adopted out over 1000 animals since 2013. We are committed to saving as many homeless animals as we can and finding them forever homes.',
      },
      {
        firstName: firstNames[randomFirstNameIndex],
        email: `${firstNames[randomFirstNameIndex]}2@example33.com`,
        image: userImages[randonImageIndex],
        role: userRoles[1],
        lastName: lastNames[randonLastNameIndex],
        socialMedia: {
          whatsapp: 'https://wa.me/1112412412',
          facebook: 'https://www.facebook.com/',
          instagram: 'https://www.instagram.com/',
          twitter: 'https://twitter.com/',
        },
        description:
          'Our shelter is a 501(c)3 non-profit organization dedicated to rescuing homeless, abandoned, abused, and neglected dogs and cats. We are a volunteer-driven group with a number of years of experience with animals and rescue. We have adopted out over 1000 animals since 2013. We are committed to saving as many homeless animals as we can and finding them forever homes.',
      },
      {
        firstName: firstNames[randomFirstNameIndex],
        email: `${firstNames[randomFirstNameIndex]}5@example33.com`,
        image: userImages[randonImageIndex],
        lastName: lastNames[randonLastNameIndex],
        role: userRoles[3] as any,
        socialMedia: {
          whatsapp: 'https://wa.me/1112412412',
          facebook: 'https://www.facebook.com/',
          instagram: 'https://www.instagram.com/',
          twitter: 'https://twitter.com/',
        },
        description:
          'Our shelter is a 501(c)3 non-profit organization dedicated to rescuing homeless, abandoned, abused, and neglected dogs and cats. We are a volunteer-driven group with a number of years of experience with animals and rescue. We have adopted out over 1000 animals since 2013. We are committed to saving as many homeless animals as we can and finding them forever homes.',
      },
      {
        firstName: firstNames[randomFirstNameIndex],
        email: `${firstNames[randomFirstNameIndex]}3@example33.com`,
        image: userImages[randonImageIndex],
        lastName: lastNames[randonLastNameIndex],
        role: userRoles[2] as any,
        socialMedia: {
          whatsapp: 'https://wa.me/1112412412',
          facebook: 'https://www.facebook.com/',
          instagram: 'https://www.instagram.com/',
          twitter: 'https://twitter.com/',
        },
        description:
          'Our shelter is a 501(c)3 non-profit organization dedicated to rescuing homeless, abandoned, abused, and neglected dogs and cats. We are a volunteer-driven group with a number of years of experience with animals and rescue. We have adopted out over 1000 animals since 2013. We are committed to saving as many homeless animals as we can and finding them forever homes.',
      },
      {
        firstName: firstNames[randomFirstNameIndex],
        email: `${firstNames[randomFirstNameIndex]}4@example33.com`,
        image: userImages[randonImageIndex],
        lastName: lastNames[randonLastNameIndex],
        role: userRoles[2] as any,
        socialMedia: {
          whatsapp: 'https://wa.me/1112412412',
          facebook: 'https://www.facebook.com/',
          instagram: 'https://www.instagram.com/',
          twitter: 'https://twitter.com/',
        },
        description:
          'Our shelter is a 501(c)3 non-profit organization dedicated to rescuing homeless, abandoned, abused, and neglected dogs and cats. We are a volunteer-driven group with a number of years of experience with animals and rescue. We have adopted out over 1000 animals since 2013. We are committed to saving as many homeless animals as we can and finding them forever homes.',
      },
    ],
  })
}

const userImages = [
  'https://cdn.midjourney.com/e3f4523e-2ee8-4b74-a1e3-b009d60a479a/0_1.png',
  'https://cdn.midjourney.com/aa780cf2-1b28-44ed-ba99-b44a30a71ea3/0_3_384_N.webp',
  'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2960&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2787&q=80',
  'https://images.unsplash.com/flagged/photo-1573740144655-bbb6e88fb18a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2835&q=80',
  'https://images.unsplash.com/photo-1546961329-78bef0414d7c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2787&q=80',
  'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2787&q=80',
  'https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2864&q=80',
  'https://images.unsplash.com/photo-1649123245135-4db6ead931b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2825&q=80',
  'https://images.unsplash.com/photo-1619895862022-09114b41f16f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80',
  'https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2788&q=80',
  'https://images.unsplash.com/photo-1479936343636-73cdc5aae0c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2960&q=80',
  'https://images.unsplash.com/photo-1450297350677-623de575f31c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2787&q=80',
  'https://images.unsplash.com/photo-1581343401100-2c1daf54cb80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2852&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2459&q=80',
]

const userRoles = [Role.ADOPTER, Role.SHELTER, Role.VET, Role.VOLUNTEER]
const firstNames = [
  'John',
  'Jane',
  'Mike',
  'Susan',
  'Chris',
  'Alex',
  'Sam',
  'Taylor',
  'Jordan',
  'Morgan',
]
const lastNames = [
  'Doe',
  'Smith',
  'Johnson',
  'Lee',
  'Brown',
  'Williams',
  'Jones',
  'Garcia',
  'Martinez',
  'Rodriguez',
]
const usernames = [
  'johnD',
  'janeS',
  'mikeJ',
  'susanL',
  'chrisB',
  'alexW',
  'samJ',
  'taylorG',
  'jordanM',
  'morganR',
]
