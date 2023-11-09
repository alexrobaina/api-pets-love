import { Storage } from '@google-cloud/storage'
import path from 'path'
import fs from 'fs/promises'

const storage = new Storage({
  keyFilename: path.join('pets-love-398920-e3d0357ac41a.json'),
})

export const googleCloudDeleted = async (deleteFiles: string | string[]) => {
  const bucketName = process.env.BUCKET_NAME as string
  let fileNames: string[] = []

  if (typeof deleteFiles === 'string') {
    fileNames = [deleteFiles]
  } else if (Array.isArray(deleteFiles)) {
    fileNames = deleteFiles
  }

  if (fileNames.length === 0) {
    return // No files to delete, move to next middleware.
  }

  if (process.env.DEV === 'true') {
    deleteLocalFiles(fileNames)
    return
  }

  const bucket = storage.bucket(bucketName)
  deleteGoogleCloudFiles({ fileNames, bucketName })
}

const deleteLocalFiles = async (fileNames: string[]) => {
  // In DEV environment, delete files from the local filesystem.
  const uploadsDir = path.join(__dirname, '../', 'uploads')
  try {
    await Promise.all(
      fileNames.map((fileName) => fs.unlink(path.join(uploadsDir, fileName))),
    )
    console.log(`Successfully deleted local files: ${fileNames.join(', ')}`)
  } catch (err) {
    console.error('Failed to delete local files:', err)
  }
}

const deleteGoogleCloudFiles = async ({
  fileNames,
  bucketName,
}: {
  fileNames: string[]
  bucketName: string
}) => {
  // In production, delete files from Google Cloud Storage.
  const bucket = storage.bucket(bucketName)
  Promise.all(fileNames.map((fileName) => bucket.file(fileName).delete()))
    .then(() => {
      console.log(
        `Successfully deleted files ${fileNames.join(', ')} from ${bucketName}`,
      )
    })
    .catch((err) => {
      console.error(
        `Failed to delete files ${fileNames.join(', ')} from ${bucketName}.`,
        err,
      )
    })
}
