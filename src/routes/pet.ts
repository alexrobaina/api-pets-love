import express from 'express';
import {
  create,
  getPet,
  getPets,
  update,
  Delete,
  getPetsUser,
  getSearchFilterPets,
  getPetsUserDashboard,
} from '../useCases/petCases/petController';
import uploadImage from '../middlewares/awsStorageImage';
import { verificaToken } from '../middlewares/auth';

const router = express.Router();

router.post('/pet', [verificaToken, uploadImage], create); // POST PET

router.get('/pets', [verificaToken], getPets); // GET PETS

router.get('/pets/searchFilterPets', getSearchFilterPets); // GET PETS

router.get('/pets/petsDashboard', [verificaToken], getPetsUserDashboard); // GET PETS DASHBOARD

router.get('/pets/petsUser', getPetsUser); // GET PETS

router.get('/pet', getPet); // GET PET

router.delete('/pet', [verificaToken], Delete); // DELETE PETS

router.put('/pet', [verificaToken, uploadImage], update); // PUT PET

export default router;
