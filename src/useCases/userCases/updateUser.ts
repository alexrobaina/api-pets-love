import { Request, Response } from 'express'
import { prisma } from '../../database/prisma'
import { deleteFiles } from '../../services/deleteFiles'
import { SUCCESS_RESPONSE, SOMETHING_IS_WRONG } from '../../constants/constants'

export const updateUser = async (req: Request, res: Response) => {
  const { id, location, socialMedia } = req.body

  const existingUser = await prisma.user.findUnique({
    where: { id },
    include: { location: true },
  });

  if (!existingUser) {
    return res.status(404).json({ ok: false, message: 'User not found!' });
  }

  if (req.body.deleteFiles) {
    await deleteFiles(req.body.deleteFiles, req.originalUrl);
  }

  try {
    let updatedLocation: any
    if (location && typeof location === 'string') {
      updatedLocation = JSON.parse(location);
      if (updatedLocation?.id && updatedLocation.city && updatedLocation.country) {
        try {
          await prisma.location.update({
            where: { id: existingUser.locationId! },
            data: updatedLocation,
          });
        } catch (error) {
          console.error(error);
          return res.status(400).json({ ok: false, message: 'Invalid location format!' });
        }
      } else {
        const newLocation = await prisma.location.create({
          data: updatedLocation,
        });
        existingUser.locationId = newLocation.id;
      }
    }

    let userUpdateData: any = {
      email: req.body.email || existingUser.email,
      username: req.body.username,
      firstName: req.body.firstName,
      role: req.body.role,
      lastName: req.body.lastName,
      description: req.body.description,
      locationId: existingUser.locationId,
      image: res.locals?.file?.images?.url ? res.locals.file.images.url : existingUser.image,
    };

    if (socialMedia !== 'null') {
      const parsedMedia = JSON.parse(socialMedia);
      if (Object.keys(parsedMedia).length > 0) {
        userUpdateData.socialMedia = parsedMedia;
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: userUpdateData,
    });

    return res.status(200).json({ user: updatedUser, ok: true, message: SUCCESS_RESPONSE });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ ok: false, message: SOMETHING_IS_WRONG, error: error.message });
  }
};
