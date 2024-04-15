import { Storage } from '@google-cloud/storage'
import path from 'path'
import fs from 'fs/promises'
import { v4 as uuidv4 } from 'uuid'

const GOOGLE_CLOUD_KEY = 'pets-love-398920-e3d0357ac41a.json'
const storage = new Storage({ keyFilename: path.join(GOOGLE_CLOUD_KEY) })

export const uploadImage = async (
  bucketName: string,
  buffer: Buffer,
  mimeType: string,
  originalUrl: string,
): Promise<string> => {
    return saveToLocalBuffer(buffer, originalUrl)

    // Uncomment this code to save the image to the cloud
    // return await saveToCloudBuffer(bucketName, buffer, mimeType, originalUrl)
}

const saveToCloudBuffer = async (
  bucketName: string,
  buffer: Buffer,
  mimeType: string,
  originalUrl: string,
): Promise<string> => {
  const fileName = `${bucketRoute(
    originalUrl,
  )}/pets-love-${uuidv4()}${Date.now()}`
  const file = storage.bucket(bucketName).file(fileName)

  return new Promise((resolve, reject) => {
    const blobStream = file.createWriteStream({
      metadata: { contentType: mimeType },
    })

    blobStream.on('error', (err) => reject(err))
    blobStream.on('finish', async () => {
      try {
        await file.makePublic()
        resolve(fileName)
      } catch (err) {
        reject(err)
      }
    })

    blobStream.end(buffer)
  })
}

const bucketRoute = (originalUrl: string) => {
  if (originalUrl.includes('/api/v1/pets')) {
    return 'pets';
  } else if (originalUrl.includes('/api/v1/user')) {
    return 'users/avatar'; // Assuming you want to maintain this more specific path for users
  } else if (originalUrl.includes('qrCode')) {
    return 'qrCode';
  }
  return '';
}

const saveToLocalBuffer = async (
  buffer: Buffer,
  originalUrl: string,
): Promise<string> => {
  
  const uploadsDir = process.env.DEV === 'true' ? path.join(__dirname, '../', `uploads/${bucketRoute(originalUrl)}`) : `${process.env.UPLOAD_DIR}/${bucketRoute(originalUrl)}` || 'uploads'
  
  try {
    await fs.access(uploadsDir)
  } catch {
    await fs.mkdir(uploadsDir, { recursive: true })
  }

  const uniqueName = `${Date.now()}.png` // or dynamically get the extension from mimeType
  const localFilePath = path.join(uploadsDir, uniqueName)

  try {
    await fs.writeFile(localFilePath, buffer)
    return uniqueName
  } catch (error) {
    throw error
  }
}
