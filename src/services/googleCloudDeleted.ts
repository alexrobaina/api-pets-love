import { Storage } from '@google-cloud/storage';
import path from 'path';

const storage = new Storage({
  keyFilename: path.join('pets-love-398920-e3d0357ac41a.json'),
});

export const googleCloudDeleted = (deleteFiles: string | [string]) => {
  const bucketName = process.env.BUCKET_NAME as string;
  let fileNames: string[] = [];

  if (typeof deleteFiles === 'string') {
    fileNames = [deleteFiles];
  } else if (Array.isArray(deleteFiles)) {
    fileNames = deleteFiles;
  }

  if (fileNames.length === 0) {
    return; // No files to delete, move to next middleware.
  }

  const bucket = storage.bucket(bucketName);

  // Use Promise.all to try to delete all files
  Promise.all(fileNames.map(fileName => bucket.file(fileName).delete()))
    .then(() => {
      console.log(`Successfully deleted files ${fileNames.join(', ')} from ${bucketName}`);
    })
    .catch(err => {
      console.error(`Failed to delete files ${fileNames.join(', ')} from ${bucketName}.`, err);
    });
};
