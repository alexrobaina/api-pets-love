import { Router } from 'express';
import passport from 'passport';
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
  petsShelter,
  getPetsForUserVet,
  getPetsForUserTransit,
} from '../controllers/pet.controller';

router.get('/api/pet/pet', pet);
router.post('/api/pet/create', passport.authenticate('jwt', { session: false }), create);
router.get('/api/pet/listPets', listPets);
router.put('/api/pet/updatePet', passport.authenticate('jwt', { session: false }), updatePet);
router.get('/api/pet/getOnePet', getOnePet);
router.get('/api/pet/queryList', queryList);
router.get('/api/pet/petsAdopted', petsAdopted);
router.get('/api/pet/listPetsForUser', getPetForUser);
router.get('/api/pet/petsShelter', petsShelter);
router.get('/api/pet/listPetForUserVet', getPetsForUserVet);
router.get('/api/pet/listPetsForUserTransit', getPetsForUserTransit);

export default router;
