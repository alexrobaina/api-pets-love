import { Response, Request } from 'express';
const { google } = require('googleapis');
import { SOMETHING_IS_WRONG, SUCCESS_RESPONSE } from '../../constants/constants';
import { config } from '../../config/config';
import { prisma } from '../../database/prisma';

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
    ];

    const petTypes = ['Dog', 'Cat', 'Bird'];
    const petGender = ['male', 'female'];
    const petBreeds = ['Labrador', 'Siamese', 'Parakeet'];
    const petAge = ['Puppy', 'Young', 'Adult', 'Senior'];

    for (let i = 0; i < 14; i++) {
      const randomTypeIndex = Math.floor(Math.random() * petTypes.length);
      const randomBreedIndex = Math.floor(Math.random() * petBreeds.length);
      const randomAgeIndex = Math.floor(Math.random() * petAge.length);
      const randomGenderIndex = Math.floor(Math.random() * petGender.length);

      await prisma.pet.create({
        data: {
          name: `Pet ${i + 1}`,
          type: petTypes[randomTypeIndex],
          breed: petBreeds[randomBreedIndex],
          age: petAge[randomAgeIndex],
          images: [petImages[i]], // Note: you should add 'image' field in your Prisma model
          gender: petGender[randomGenderIndex],
        },
      });
    }
    return res.status(200).json({
      status: 200,
      message: SUCCESS_RESPONSE,
    });
  } catch (error) {
    if (error) {
      console.log(error);

      return res.status(500).json({
        code: 4,
        ok: false,
        error: Error,
        message: SOMETHING_IS_WRONG,
      });
    }
  }
};
