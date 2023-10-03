import { Response, Request } from 'express';
import { prisma } from '../../database/prisma';

export const users = async (_req: Request, res: Response) => {
  try {
    const userImages = [
      'https://cdn.midjourney.com/e3f4523e-2ee8-4b74-a1e3-b009d60a479a/0_1.png',
      'https://cdn.midjourney.com/aa780cf2-1b28-44ed-ba99-b44a30a71ea3/0_3_384_N.webp' ,
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
    ];

    const userRoles = ['VOLUNTEER', 'VET', 'SHELTER', 'ADOPTER', 'ADMIN'];
    const firstNames = [
      'John', 'Jane', 'Mike', 'Susan', 'Chris', 'Alex', 'Sam', 'Taylor', 'Jordan', 'Morgan'
    ];
    const lastNames = [
      'Doe', 'Smith', 'Johnson', 'Lee', 'Brown', 'Williams', 'Jones', 'Garcia', 'Martinez', 'Rodriguez'
    ];
    const usernames = ['johnD', 'janeS', 'mikeJ', 'susanL', 'chrisB', 'alexW', 'samJ', 'taylorG', 'jordanM', 'morganR'];

    // Iterate over the arrays to create users
    for (let i = 0; i < userImages.length; i++) {
      const randomRoleIndex = Math.floor(Math.random() * userRoles.length);

      await prisma.user.create({
        data: {
          role: userRoles[randomRoleIndex] as any, // Ensure the role is treated as a valid enum value
          firstName: firstNames[i],
          lastName: lastNames[i],
          username: usernames[i],
          image: userImages[i],
          email: `${usernames[i]}@example33.com`,
        },
      });
    }

    return res.status(200).json({
      status: 200,
      message: 'Users seeded successfully!',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      message: 'Something went wrong while seeding users',
    });
  }
};