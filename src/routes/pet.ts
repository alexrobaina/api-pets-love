import express from 'express'
import {
  create,
  getPet,
  getPets,
  update,
  deletePet,
  getUserPets,
  deleteMedicalRecord,
  updateMedicalRecord,
} from '../useCases/petCases/petController'
import { verifyToken } from '../middlewares/auth'
import { createCloudUploader } from '../middlewares/cloudUploader'
import { createMedicalRecord } from '../useCases/petCases/createMedicalRecord'
import { getMedicalRecord } from '../useCases/petCases/getMedicalRecord'

const uploadImagesCreationPet = createCloudUploader('newImages')
const uploadImagesUpdatePet = createCloudUploader('newImages')
const uploadImagesMedicalRecord = createCloudUploader('newAttachments')

const router = express.Router()

router.post('/pets', [verifyToken, uploadImagesCreationPet], create) // CREATE PET

router.put('/pets/:petId', [verifyToken, uploadImagesUpdatePet], update) // UPDATE PET

router.get('/pets', getPets) // GET PETS

// this route is for calculate the total of pets for the dashboard and another things
// router.get('/dashboard/pets', [verifyToken], getDashboardPets) // GET PETS FOR DASHBOARD

router.get('/pets/user', getUserPets) // GET PETS

router.post(
  '/pets/medicalRecord',
  [verifyToken, uploadImagesMedicalRecord],
  createMedicalRecord,
) // CREATE PET MEDICAL RECORD

router.get('/pets/medicalRecord/:id', getMedicalRecord) // GET MEDICAL RECORD

router.put(
  '/pets/medicalRecord/:id',
  [verifyToken, uploadImagesMedicalRecord],
  updateMedicalRecord,
)

router.delete('/pets/medicalRecord/:id', [verifyToken], deleteMedicalRecord)

router.get('/pets/:petId', getPet) // GET PET BY ID

router.delete('/pets/:petId', [verifyToken], deletePet) // DELETE PETS BY ID

export default router
