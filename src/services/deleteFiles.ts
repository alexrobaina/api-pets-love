import { Storage } from '@google-cloud/storage';
import path from 'path';
import fs from 'fs/promises';

const storage = new Storage({
  keyFilename: path.join('pets-love-398920-e3d0357ac41a.json'),
});

export const deleteFiles = async (deleteFiles: string | string[], originalUrl: string) => {
  let fileNames: string[] = [];

  if (typeof deleteFiles === 'string') {
    fileNames = [deleteFiles];
  } else if (Array.isArray(deleteFiles)) {
    fileNames = deleteFiles;
  }

  if (fileNames.length === 0) {
    return; // No files to delete, move to next middleware.
  }

  deleteLocalFiles(fileNames, originalUrl);
};

const bucketRoute = (originalUrl: string) => {
  if (originalUrl.includes('/api/v1/pets')) {
    return 'pets';
  } else if (originalUrl.includes('/api/v1/vaccines/petVaccine')) {
    return 'vaccines';
  } else if (originalUrl.includes('/api/v1/user')) {
    return 'users/avatar'; // Assuming you want to maintain this more specific path for users
  } else if (originalUrl.includes('/api/v1/inventory')) {
    return 'inventory'; // Assuming you want to maintain this more specific path for users
  } else if (originalUrl.includes('qrCode')) {
    return 'qrCode';
  }
  return '';
};

const deleteLocalFiles = async (fileNames: string[], originalUrl: string) => {
  // In DEV environment, delete files from the local filesystem.
  const uploadsDir =
    process.env.DEV === 'true'
      ? path.join(__dirname, '../', `uploads/${bucketRoute(originalUrl)}`)
      : `${process.env.UPLOAD_DIR}/${bucketRoute(originalUrl)}` || 'uploads';
  try {
    await Promise.all(fileNames.map(fileName => fs.unlink(path.join(uploadsDir, fileName))));
    console.log(`Successfully deleted local files: ${fileNames.join(', ')}`);
  } catch (err) {
    console.error('Failed to delete local files:', err);
  }
};

const deleteGoogleCloudFiles = async ({
  fileNames,
  bucketName,
}: {
  fileNames: string[];
  bucketName: string;
}) => {
  // In production, delete files from Google Cloud Storage.
  const bucket = storage.bucket(bucketName);
  Promise.all(fileNames.map(fileName => bucket.file(fileName).delete()))
    .then(() => {
      console.log(`Successfully deleted files ${fileNames.join(', ')} from ${bucketName}`);
    })
    .catch(err => {
      console.error(`Failed to delete files ${fileNames.join(', ')} from ${bucketName}.`, err);
    });
};
