import { Request, Response, NextFunction } from 'express'
import Multer from 'multer'
import { saveToLocal } from './utils/saveToLocal'
import { saveToCloud } from './utils/saveToCloud'
import { handleError } from './utils/handleError'

// ... (other imports or code)

const multerMemoryStorage = Multer({
  storage: Multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit to 5MB
})

/**
 * Factory function creating the middleware handling the upload based on the given field name.
 * @param fieldName - The name of the field containing the files in the request.
 * @returns Express middleware tailored for the specified field.
 */
export const createGoogleCloudUploader = (fieldName: string) => {
  // Return the middleware function
  return (req: Request, res: Response, next: NextFunction) => {
    // Use multer to upload the file. 'array' is used here to signify multiple files.
    const upload = multerMemoryStorage.array(fieldName)

    upload(req, res, async (err) => {
      if (err) {
        return handleError(res, err, 'Something is wrong with the file upload!')
      }
      console.log(req.files)

      // If no files were uploaded, continue with the next middleware
      if (!req.files || req.files.length === 0) {
        return next()
      }

      // Choose where to save the files based on the environment
      try {
        if (process.env.DEV === 'true') {
          await saveToLocal({ req, res, fieldName })
        } else {
          await saveToCloud(req, res, process.env.BUCKET_NAME as string)
        }
        next()
      } catch (error: any) {
        handleError(res, error, 'Error saving the file.')
      }
    })
  }
}
