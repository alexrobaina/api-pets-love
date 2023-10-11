import express from 'express'
import { getVaccine } from '../useCases/vaccineCase/vaccineController'

const router = express.Router()

router.get('/vaccines', getVaccine)

export default router
