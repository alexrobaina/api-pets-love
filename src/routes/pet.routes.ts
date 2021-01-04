import { Router } from 'express';
import awsDeleteImage from '../middlewares/awsDeleteImage';
import passport from 'passport';
const router = Router();

import {
  pet,
  create,
  listPets,
  updatePet,
  getOnePet,
  deletePet,
  petsAdopted,
  petsShelter,
  getPetForUser,
  searchFilterPet,
  getPetsForUserVet,
  getPetsForUserTransit,
} from '../controllers/pet.controller';

router.get('/pet/pet', pet);
router.post('/pet/create', passport.authenticate('jwt', { session: false }), create);
router.get('/pet/listPets', listPets);
router.put('/pet/updatePet', passport.authenticate('jwt', { session: false }), updatePet);
router.get('/pet/getOnePet', getOnePet);
router.get('/pet/searchFilterPet', searchFilterPet);
router.get('/pet/petsAdopted', petsAdopted);
router.get('/pet/listPetsForUser', getPetForUser);
router.get('/pet/petsShelter', petsShelter);
router.get('/pet/listPetForUserVet', getPetsForUserVet);
router.get('/pet/listPetsForUserTransit', getPetsForUserTransit);
router.delete(
  '/pet/delete',
  // passport.authenticate('jwt', { session: false }),
  // awsDeleteImage,
  deletePet
);

export default router;
