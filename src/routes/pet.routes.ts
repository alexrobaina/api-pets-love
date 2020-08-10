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
  petsForAdoption,
  getPetsForUserVet,
  getPetForUserAdopted,
  getPetsForUserTransit,
} from '../controllers/pet.controller';

router.get('/api/pet/pet', passport.authenticate('jwt', { session: false }), pet);
router.post('/api/pet/create', passport.authenticate('jwt', { session: false }), create);
router.get('/api/pet/listPets', passport.authenticate('jwt', { session: false }), listPets);
router.put('/api/pet/updatePet', passport.authenticate('jwt', { session: false }), updatePet);
router.get('/api/pet/getOnePet', passport.authenticate('jwt', { session: false }), getOnePet);
router.get('/api/pet/queryList', passport.authenticate('jwt', { session: false }), queryList);
router.get('/api/pet/petsAdopted', passport.authenticate('jwt', { session: false }), petsAdopted);
router.get(
  '/api/pet/listPetsForUser',
  passport.authenticate('jwt', { session: false }),
  getPetForUser
);
router.get(
  '/api/pet/petsForAdoption',
  passport.authenticate('jwt', { session: false }),
  petsForAdoption
);
router.get(
  '/api/pet/listPetForUserVet',
  passport.authenticate('jwt', { session: false }),
  getPetsForUserVet
);
router.get(
  '/api/pet/listPetsForUserTransit',
  passport.authenticate('jwt', { session: false }),
  getPetsForUserTransit
);
router.get(
  '/api/pet/listPetForUserAdopted',
  passport.authenticate('jwt', { session: false }),
  getPetForUserAdopted
);

export default router;
