import { Request, Response } from 'express';
import { SUCCESS_RESPONSE, SOMETHING_IS_WRONG } from '../../constants/constants';
import { prisma } from '../../database/prisma';
import { googleCloudDeleted } from '../../services/googleCloudDeleted';

export const updateUser = async (req: Request, res: Response) => {
  const { id, locationId, location, socialMedia } = req.body;
  const userToken: { id?: string } = req.user || '';

  // Fetch the existing user with social media data from the database
  const existingUser = await prisma.user.findUnique({
    where: { id },
    select: { socialMedia: true },
  });

  if (id !== userToken.id) {
    return res.status(401).json({ ok: false, message: 'Unauthorized' });
  }

  if (!existingUser) return res.status(404).json({ ok: false, message: 'User not found!' });

  if (req.body.deleteFiles && req.body.deleteFiles.include('pets=love'))
    await googleCloudDeleted(req.body.deleteFiles);
  delete req.body.deleteFiles;

  if (!id) return res.status(400).json({ ok: false, message: 'User ID is required!' });

  try {
    let newLocation: typeof location;

    try {
      newLocation = typeof location === 'string' ? JSON.parse(location) : location;
    } catch (error) {
      return res.status(400).json({ ok: false, message: 'Invalid location format!' });
    }

    // Merge the existing socialMedia with the new one, overriding only the provided fields
    const existingSocialMedia =
      typeof existingUser.socialMedia === 'object' ? existingUser.socialMedia : {};
    const updatedSocialMedia = { ...existingSocialMedia, ...JSON.parse(socialMedia) };

    const updatedLocationId = await handleLocationUpdate(locationId, newLocation);
    const cleanedData = cleanData({ ...req.body, socialMedia: JSON.stringify(updatedSocialMedia) });

    if (res.locals.file) cleanedData.image = res.locals.file.url;

    const user = await prisma.user.update({
      where: { id },
      data: { ...cleanedData, locationId: updatedLocationId },
    });

    return res.status(200).json({ user, ok: true, message: SUCCESS_RESPONSE });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ ok: false, message: SOMETHING_IS_WRONG, error });
  }
};

const handleLocationUpdate = async (locationId: string, newLocation: any) => {
  const isValidLocationData = validateLocationData(newLocation);

  if (locationId && isValidLocationData) {
    const existingLocation = await prisma.location.findUnique({ where: { id: locationId } });
    if (!existingLocation) throw new Error('Location not found');

    if (JSON.stringify(newLocation) !== JSON.stringify(existingLocation)) {
      const locationUpdated = await prisma.location.update({
        where: { id: locationId },
        data: newLocation,
      });
      return locationUpdated.id;
    }
  } else if (isValidLocationData) {
    const locationCreated = await prisma.location.create({ data: newLocation });
    return locationCreated.id;
  }

  return locationId;
};

const validateLocationData = (location: any) =>
  location && Object.values(location).every(val => val !== '' && val !== 0);

const cleanData = (obj: Record<string, any>): Record<string, any> => {
  const newObj: Record<string, any> = {};

  for (let [key, value] of Object.entries(obj)) {
    if (key === 'location' || value == null || value === '') continue;
    if (key === 'socialMedia') value = JSON.parse(value);

    newObj[key] = typeof value === 'object' && !Array.isArray(value) ? cleanData(value) : value;
  }

  return newObj;
};
