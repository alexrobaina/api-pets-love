import path from 'path'
import { promises as fs } from 'fs'
import { handleError } from './handleError'

declare global {
  namespace Express {
    interface Response {
      locals: {
        file?: {
          url?: string
          urls?: string[]
        }
      }
    }
  }
}

export const saveToLocal = async ({
  req,
  res,
  fieldName,
}: {
  req: any
  res: any
  fieldName: string
}) => {
  const uploadsDir = path.join(__dirname, '../..', 'uploads')

  try {
    await fs.access(uploadsDir)
  } catch {
    await fs.mkdir(uploadsDir, { recursive: true })
  }

  const urls: string[] = []
  for (const file of req.files) {
    const uniqueName = `${Date.now()}-pets-love`
    const localFilePath = path.join(uploadsDir, uniqueName)

    try {
      await fs.writeFile(localFilePath, file.buffer)
      urls.push(uniqueName)
    } catch (error: any) {
      handleError({
        res,
        error,
        status: 500,
        message: 'Failed to save the image locally.',
      })
    }
  }

  res.locals.file =
    urls.length === 1
      ? { [fieldName]: { url: urls[0] } }
      : { [fieldName]: { urls } }
}
