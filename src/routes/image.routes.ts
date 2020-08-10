import { Router } from 'express';
import uploadImages from '../middlewares/awsStorageImage';
import passport from 'passport';
const router = Router();

import { addPetImages, listPetImage, updatePetImages } from '../controllers/petImage.controller';

router.post(
  '/api/pet/images',
  passport.authenticate('jwt', { session: false }),
  uploadImages,
  addPetImages
);

router.get('/api/pet/listImages', passport.authenticate('jwt', { session: false }), listPetImage);

router.post(
  '/api/pet/updateImage',
  passport.authenticate('jwt', { session: false }),
  uploadImages,
  updatePetImages
);

import {
  addUserImages,
  listUserImage,
  updateUserImages,
} from '../controllers/userImage.controller';

router.post(
  '/api/user/addUserImages',
  passport.authenticate('jwt', { session: false }),
  uploadImages,
  addUserImages
);

router.get(
  '/api/user/listUserImage',
  passport.authenticate('jwt', { session: false }),
  listUserImage
);

router.post(
  '/api/user/updateUserImages',
  passport.authenticate('jwt', { session: false }),
  uploadImages,
  updateUserImages
);

export default router;
