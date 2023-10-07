import { Response, Request } from 'express'
import { SOMETHING_IS_WRONG, SUCCESS_RESPONSE } from '../../constants/constants'
import { prisma } from '../../database/prisma'

//=====================================
//        LOGIN USERS = POST
//=====================================

export const pets = async (_req: Request, res: Response) => {
  try {
    const petImages = [
      'https://cdn.midjourney.com/ccf590e2-9d8c-4666-961c-079a48ab6821/0_0.png',
      'https://cdn.midjourney.com/ccf590e2-9d8c-4666-961c-079a48ab6821/0_0.png',
      'https://cdn.midjourney.com/6a236d52-4bd9-4e91-b478-3309f37be482/0_2_384_N.webp',
      'https://cdn.midjourney.com/c5530c6a-e101-48e0-b5f2-4a77f75275cc/0_2.png',
      'https://cdn.midjourney.com/14c587df-27a4-46c6-927e-b89a1df52a7f/0_0_384_N.webp',
      'https://cdn.midjourney.com/d2788b81-d80f-4d9f-b84d-7123fa5f6fad/0_1_384_N.webp',
      'https://cdn.midjourney.com/f4cda6b4-6f71-42f4-b6b4-1a5491bf1e1b/0_1_384_N.webp',
      'https://cdn.midjourney.com/957dcdd0-e34e-4d45-aa77-8bea2c7ba3e7/0_2.png',
      'https://cdn.midjourney.com/6542966e-3007-4452-acde-1249975b52e6/0_1_384_N.webp',
      'https://cdn.midjourney.com/0f4ceabb-57d5-42bb-907c-ad51f6addb76/0_1.png',
      'https://cdn.midjourney.com/79499b89-ef03-47fa-9bcb-e05f1ed9c559/0_0_384_N.webp',
      'https://cdn.midjourney.com/516499b4-8dc8-4ab9-989e-2247ca8050ba/0_0_384_N.webp',
      'https://cdn.midjourney.com/a5f51379-e138-4a60-99ee-d7b0e0494314/0_2_384_N.webp',
      'https://cdn.midjourney.com/540dfb77-b296-443f-b170-6a35cf336fd3/0_0_384_N.webp',
      'https://cdn.midjourney.com/c29f0010-73c7-4a5a-89c1-4f33cad09c29/0_0.png',
    ]

    const category = ['dog', 'cat', 'bird']
    const gender = ['male', 'female']
    const breed = ['Labrador', 'Siamese', 'Parakeet']
    const age = ['Puppy', 'Young', 'Adult', 'Senior']
    const size = ['small', 'medium', 'large', 'Extra Large']
    const petNames = [
      'Bella',
      'Max',
      'Charlie',
      'Lucy',
      'Cooper',
      'Luna',
      'Milo',
      'Rocky',
      'Daisy',
      'Bailey',
      'Chloe',
      'Sadie',
      'Lola',
      'Buddy',
      'Zoe',
      'Oliver',
      'Toby',
      'Peanut',
      'Bear',
      'Ruby',
      'Molly',
      'Leo',
      'Jack',
      'Lily',
      'Sophie',
      'Riley',
      'Dexter',
      'Bentley',
      'Ziggy',
      'Zeus',
    ]

    const petDescription = `He boasts tufted ears, a hallmark of his breed, and a long, bushy tail reminiscent of a luxurious feather duster. With a weight tipping the scale at 18 pounds, he is undeniably large but wears his size with elegance and grace. He possesses a gentle disposition, often seeking the warmth of a human lap or the soft notes of a lullaby sung by his favorite humans. Despite his calm demeanor, Whiskers has a playful side. He's particularly fond of feather toys and laser pointers, often displaying the agility and stealth of a panther when engaged in play.`

    for (let i = 0; i < 14; i++) {
      const randomTypeIndex = Math.floor(Math.random() * category.length)
      const randomBreedIndex = Math.floor(Math.random() * breed.length)
      const randomAgeIndex = Math.floor(Math.random() * age.length)
      const randomGenderIndex = Math.floor(Math.random() * gender.length)
      const randomSizeIndex = Math.floor(Math.random() * size.length)
      const randomPetNamesIndex = Math.floor(Math.random() * petNames.length)

      await prisma.pet.create({
        data: {
          name: petNames[randomPetNamesIndex],
          category: category[randomTypeIndex],
          breed: breed[randomBreedIndex],
          age: age[randomAgeIndex],
          images: [petImages[i]], // Note: you should add 'image' field in your Prisma model
          gender: gender[randomGenderIndex],
          size: size[randomSizeIndex],
          description: petDescription,
        },
      })
    }
    return res.status(200).json({
      status: 200,
      message: SUCCESS_RESPONSE,
    })
  } catch (error) {
    if (error) {
      console.log(error)

      return res.status(500).json({
        code: 4,
        ok: false,
        error: Error,
        message: SOMETHING_IS_WRONG,
      })
    }
  }
}
