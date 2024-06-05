import path from 'path';
import { promises as fs } from 'fs';
import { handleError } from './handleError';

declare global {
  namespace Express {
    interface Response {
      locals: {
        file?: {
          url?: string;
          urls?: string[];
        };
      };
    }
  }
}

const bucketRoute = (originalUrl: string) => {
  console.log(originalUrl);
  if (originalUrl.includes('/api/v1/pets')) {
    return 'pets';
  } else if (originalUrl.includes('/api/v1/user')) {
    return 'users/avatar'; // Assuming you want to maintain this more specific path for users
  } else if (originalUrl.includes('/api/v1/vaccines/petVaccine/')) {
    return 'vaccines'; // Assuming you want to maintain this more specific path for users
  } else if (originalUrl.includes('/api/v1/inventory')) {
    return 'inventory'; // Assuming you want to maintain this more specific path for users
  } else if (originalUrl.includes('qrCode')) {
    return 'qrCode';
  }
  return '';
};

export const saveToLocal = async ({
  req,
  res,
  fieldName,
}: {
  req: any;
  res: any;
  fieldName: string;
}) => {
  const uploadsDir =
    process.env.DEV === 'true'
      ? path.join(__dirname, '../..', `uploads/${bucketRoute(req.originalUrl)}`)
      : `${process.env.UPLOAD_DIR}/${bucketRoute(req.originalUrl)}` || 'uploads';

  try {
    await fs.access(uploadsDir);
  } catch {
    await fs.mkdir(uploadsDir, { recursive: true });
  }

  const urls: string[] = [];
  for (const file of req.files) {
    const uniqueName = `${Date.now()}-pets-love`;
    const localFilePath = path.join(uploadsDir, uniqueName);

    try {
      await fs.writeFile(localFilePath, file.buffer);
      urls.push(uniqueName);
    } catch (error: any) {
      handleError({
        res,
        error,
        status: 500,
        message: 'Failed to save the image locally.',
      });
    }
  }

  res.locals.file =
    urls.length === 1 ? { [fieldName]: { url: urls[0] } } : { [fieldName]: { urls } };
};
