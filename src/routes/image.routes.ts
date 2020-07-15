import { Router } from 'express';
import uploadImages from '../middlewares/awsStorageImage';
const router = Router();

import { addPetImages, listPetImage, updatePetImages } from '../controllers/petImage.controller';

router.post('/api/pet/images', uploadImages, addPetImages);
router.get('/api/pet/listImages', listPetImage);
router.post('/api/pet/updateImage', uploadImages, updatePetImages);

import {
  addUserImages,
  listUserImage,
  updateUserImages,
} from '../controllers/userImage.controller';

router.post('/api/user/addUserImages', uploadImages, addUserImages);
router.get('/api/user/listUserImage', listUserImage);
router.post('/api/user/updateUserImages', uploadImages, updateUserImages);

export default router;
