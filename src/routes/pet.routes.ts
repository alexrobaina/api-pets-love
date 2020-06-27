import { Router } from 'express';
const router = Router();

import {
  add,
  pet,
  listPets,
  updatePet,
  getOnePet,
  petsAdopted,
  getPetForUser,
  petsForAdoption,
} from '../controllers/pet.controller';

router.get('/api/pet/pet', pet);
router.post('/api/pet/create', add);
router.get('/api/pet/listPets', listPets);
router.put('/api/pet/updatePet', updatePet);
router.get('/api/pet/getOnePet', getOnePet);
router.get('/api/pet/petsAdopted', petsAdopted);
router.get('/api/pet/listPetsForUser', getPetForUser);
router.get('/api/pet/petsForAdoption', petsForAdoption);

export default router;
