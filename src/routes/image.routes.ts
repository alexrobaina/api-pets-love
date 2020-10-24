import { Router } from 'express';
import uploadImages from '../middlewares/awsStorageImage';
import passport from 'passport';
const router = Router();

import {
  addPetImages,
  listPetImage,
  updatePetImages,
  deletePetImage,
  deleteImages,
} from '../controllers/petImage.controller';

router.post(
  '/pet/images',
  passport.authenticate('jwt', { session: false }),
  uploadImages,
  addPetImages
);

router.delete('/deleteImage', passport.authenticate('jwt', { session: false }), deleteImages);

router.get('/pet/listImages', passport.authenticate('jwt', { session: false }), listPetImage);

router.post(
  '/pet/updateImage',
  passport.authenticate('jwt', { session: false }),
  uploadImages,
  updatePetImages
);

router.delete(
  '/pet/removePetImage',
  passport.authenticate('jwt', { session: false }),
  uploadImages,
  deletePetImage
);

import {
  addUserImages,
  listUserImage,
  deleteUserImage,
  updateUserImages,
} from '../controllers/userImage.controller';

router.delete(
  '/deleteUserImage',
  passport.authenticate('jwt', { session: false }),
  deleteUserImage
);

router.post(
  '/user/addUserImages',
  passport.authenticate('jwt', { session: false }),
  uploadImages,
  addUserImages
);

router.get('/user/listUserImage', passport.authenticate('jwt', { session: false }), listUserImage);

router.post(
  '/user/updateUserImages',
  passport.authenticate('jwt', { session: false }),
  uploadImages,
  updateUserImages
);

export default router;
