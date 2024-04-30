import { Response, Request } from 'express'
import { SOMETHING_IS_WRONG, SUCCESS_RESPONSE } from '../../constants/constants'
import { prisma } from '../../database/prisma'
import { deleteFiles } from '../../services/deleteFiles'

export const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, deleteFile, files: existingFiles } = req.body;
  const newImage = res.locals?.file?.files?.url; // Assumes middleware like `multer` handles file uploads

  try {
    // If there's a new image and existing files, delete existing files first
    if (newImage && existingFiles && existingFiles.length) {
      await deleteFiles(existingFiles, req.originalUrl);
    }

    // If deleteFile is specified, delete those files (can overlap with new image handling)
    if (deleteFile) {
      await deleteFiles(deleteFile, req.originalUrl);
    }

    // Decide what files to save based on the presence of newImage or instructions to delete
    let files;
    if (deleteFile && !newImage) {
      files = []; // Clear files if instructed to delete without a new image to replace them
    } else {
      files = newImage ? [newImage] : existingFiles; // Replace with newImage or retain existing if no newImage
    }

    // Prepare data for update
    let data = {
      status: status,
      files,
    };

    // Update database record
    const vaccines = await prisma.petVaccine.update({
      where: { id },
      data,
    });

    res.status(200).json({
      ok: true,
      vaccines,
      message: SUCCESS_RESPONSE,
    });
  } catch (error: any) {
    console.error("Error updating pet vaccine:", error); // More detailed error logging
    res.status(500).json({
      code: 4,
      ok: false,
      error: error?.message, // Send the actual error message for better debugging client-side
      message: SOMETHING_IS_WRONG,
    });
  }
}