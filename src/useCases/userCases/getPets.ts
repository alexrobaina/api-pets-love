// import { Request, Response } from 'express';
// import { SUCCESS_RESPONSE, SOMETHING_IS_WRONG } from '../../constants/constants';
// import { prisma } from '../../database/prisma';

// //=====================================
// //        READ LIST USERS = GET
// //=====================================

// export const getPets = async (req: Request, res: Response) => {
//   const id = req.query.id as string;

//   const pets = await prisma.pet.findMany({
//     where: {
//       userId: id,
//     },

//     select: {
//       id: true,
//       email: true,
//       username: true,
//       image: true,
//       role: true,
//       socialMedia: true,
//     },
//   });

//   try {
//     res.status(200).json({
//       users,
//       ok: true,
//       message: SUCCESS_RESPONSE,
//     });
//   } catch (error) {
//     if (error) {
//       console.log(error);
//       return res.status(500).json({
//         ok: false,
//         message: SOMETHING_IS_WRONG,
//         error,
//       });
//     }
//   }
// };
