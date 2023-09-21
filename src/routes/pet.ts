import express from 'express';
import {
  create,
  getPet,
  getPets,
  update,
  Delete,
  getPetsUser,
} from '../useCases/petCases/petController';
// import uploadImage from '../middlewares/awsStorageImage';
import { verifyToken } from '../middlewares/auth';

const router = express.Router();

// router.post('/pet', [verifyToken, uploadImage], create); // POST PET

router.get('/pets/', getPets); // GET PETS

// router.get('/pets/searchFilterPets', getSearchFilterPets); // GET PETS

// router.get('/pets/petsDashboard', [verifyToken], getPetsUserDashboard); // GET PETS DASHBOARD

router.get('/pets/petsUser', getPetsUser); // GET PETS

router.get('/pet', getPet); // GET PET

router.delete('/pet', [verifyToken], Delete); // DELETE PETS

// router.put('/pet', [verifyToken, uploadImage], update); // PUT PET

export default router;
