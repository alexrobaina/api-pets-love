import express from 'express'
import {
  create,
  getPet,
  getPets,
  update,
  deletePet,
  getPetsUser,
  getDashboardPets,
} from '../useCases/petCases/petController'
import { verifyToken } from '../middlewares/auth'
import { createGoogleCloudUploader } from '../middlewares/googleCloudUploader'

const uploadImagesCreationPet = createGoogleCloudUploader('newImages')
const uploadImagesUpdatePet = createGoogleCloudUploader('newImages')

const router = express.Router()

router.post('/pets', [verifyToken, uploadImagesCreationPet], create) // CREATE PET

router.put('/pets/:petId', [verifyToken, uploadImagesUpdatePet], update) // UPDATE PET

router.get('/pets', getPets) // GET ALL PETS

router.get('/dashboard/pets', [verifyToken], getDashboardPets) // GET PETS FOR DASHBOARD

router.get('/pets/petsUser', getPetsUser) // GET PETS

router.get('/pets/:petId', getPet) // GET PET BY ID

router.delete('/pets/:petId', [verifyToken], deletePet) // DELETE PETS BY ID

export default router
