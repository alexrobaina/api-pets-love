import { Router } from 'express';
const router = Router();

import {
  pet,
  create,
  listPets,
  updatePet,
  getOnePet,
  queryList,
  petsAdopted,
  getPetForUser,
  petsForAdoption,
  getPetForUserVet,
  getPetForUserAdopted,
} from '../controllers/pet.controller';

router.get('/api/pet/pet', pet);
router.post('/api/pet/create', create);
router.get('/api/pet/listPets', listPets);
router.put('/api/pet/updatePet', updatePet);
router.get('/api/pet/getOnePet', getOnePet);
router.get('/api/pet/queryList', queryList);
router.get('/api/pet/petsAdopted', petsAdopted);
router.get('/api/pet/listPetsForUser', getPetForUser);
router.get('/api/pet/petsForAdoption', petsForAdoption);
router.get('/api/pet/listPetForUserVet', getPetForUserVet);
router.get('/api/pet/listPetForUserAdopted', getPetForUserAdopted);

export default router;
