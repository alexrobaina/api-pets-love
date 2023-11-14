import express from 'express'
import { getVaccine } from '../useCases/vaccineCase/vaccineController'
import { update } from '../useCases/vaccineCase/update'
import { createGoogleCloudUploader } from '../middlewares/googleCloudUploader'
import { deletePetVaccine } from '../useCases/vaccineCase/deletePetVaccine'

const uploadImagesUpdatePetVaccine = createGoogleCloudUploader('files')

const router = express.Router()

router.get('/vaccines', getVaccine)

router.put('/vaccines/petVaccine/:id', uploadImagesUpdatePetVaccine, update)
router.delete('/vaccines/petVaccine/:id', deletePetVaccine)

export default router
