import { Request, Response, NextFunction } from 'express'
import Multer from 'multer'
import { saveToLocal } from './utils/saveToLocal'
import { handleError } from './utils/handleError'

const multerMemoryStorage = Multer({
  storage: Multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit to 5MB
})

/**
 * Factory function creating the middleware handling the upload based on the given field name.
 * @param fieldName - The name of the field containing the files in the request.
 * @returns Express middleware tailored for the specified field.
 */
// ... (other code)

export const createCloudUploader = (fieldName: string) => {
  // Return the middleware function
  return (req: Request, res: Response, next: NextFunction) => {
    // Check if file size exceeds the limits
    if (req.headers['content-length']) {
      const contentLength = parseInt(req.headers['content-length'], 10)
      if (contentLength > 5 * 1024 * 1024) {
        // Resize the image before saving
        return handleError({
          res,
          status: 400,
          message: 'File size exceeds the limit of 5MB.',
          error: new Error('File size exceeds the limit of 5MB.'),
        })
      }
    }

    // Use multer to upload the file. 'array' is used here to signify multiple files.
    const upload = multerMemoryStorage.array(fieldName)

    upload(req, res, async (err) => {
      if (err) {
        return handleError({
          res,
          error: err,
          status: 500,
          message: 'Something is wrong with the file upload!',
        })
      }

      // If no files were uploaded, continue with the next middleware
      if (!req.files || req.files.length === 0) {
        return next()
      }
      // Choose where to save the files based on the environment
      try {
          await saveToLocal({ req, res, fieldName })
        next()
      } catch (error: any) {
        handleError({
          res,
          error,
          status: 500,
          message: 'Error saving the file.',
        })
      }
    })
  }
}
