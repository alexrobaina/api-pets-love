import express from 'express';
import {
  create,
  getPet,
  getPets,
  update,
  Delete,
  getPetsUser,
  getSearchFilterPets,
} from '../useCases/petCases/petController';
import { verificaToken } from '../middlewares/auth';

const router = express.Router();

// router.post('/pet/', [verificaToken], create); // POST PET
router.post('/pet/', create); // POST PET

router.get('/pets/', getPets); // GET PETS

router.get('/pets/searchFilterPets', getSearchFilterPets); // GET PETS

router.get('/pets/petsUser', [verificaToken], getPetsUser); // GET PETS

router.get('/pet', getPet); // GET PET

router.delete('/pet', Delete); // DELETE PETS

router.put('/pet', update); // PUT PET

export default router;
