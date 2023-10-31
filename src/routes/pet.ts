import express from 'express'
import {
  create,
  getPet,
  getPets,
  deletePet,
  getPetsUser,
  getDashboardPets,
} from '../useCases/petCases/petController'
import { verifyToken } from '../middlewares/auth'
import { createGoogleCloudUploader } from '../middlewares/googleCloudUploader'
// import { googleCloudUploader } from '../middlewares/googleCloudUploader'\

const googleCloudUploade = createGoogleCloudUploader('images')
// const qrCodeGoogleCloudUploade = createGoogleCloudUploader('qrCode')

const router = express.Router()

router.post('/pets', [verifyToken, googleCloudUploade], create) // POST PET

router.get('/pets', getPets) // GET PETS

router.get('/dashboard/pets', [verifyToken], getDashboardPets) // GET PETS

// This route need verify and put in user file
router.get('/pets/petsUser', getPetsUser) // GET PETS

router.get('/pets/:petId', getPet) // GET PET

router.delete('/pets/:petId', [verifyToken], deletePet) // DELETE PETS

export default router
