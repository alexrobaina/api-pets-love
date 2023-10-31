import { v4 as uuidv4 } from 'uuid'
import { Storage } from '@google-cloud/storage'
import path from 'path'

const GOOGLE_CLOUD_KEY = 'pets-love-398920-e3d0357ac41a.json'
const storage = new Storage({ keyFilename: path.join(GOOGLE_CLOUD_KEY) })

export const saveToCloud = async (req: any, res: any, bucketName: string) => {
  const fileName = `${bucketRoute(
    req.originalUrl,
  )}/pets-love-${uuidv4()}${Date.now()}`
  const file = storage.bucket(bucketName).file(fileName)

  const blobStream = file.createWriteStream({
    metadata: { contentType: req.file.mimetype },
  })

  blobStream.on('error', (err) => handleError(res, err, 'Something is wrong!'))
  blobStream.on('finish', async () => {
    try {
      await file.makePublic()
      res.locals.file = { url: fileName }
    } catch (err: any) {
      handleError(res, err, 'Something is wrong!')
    }
  })
  blobStream.end(req.file.buffer)
}

const bucketRoute = (path: string) => {
  const routes: { [key: string]: string } = {
    '/api/v1/user/': 'users/avatar',
    '/api/v1/pets/': 'pets',
  }
  return routes[path] || ''
}

const handleError = (
  res: any,
  error: Error,
  message: string,
  status: number = 500,
) => {
  console.error(error)
  res.locals.error = { status, message, error }
  return
}
