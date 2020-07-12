import { Router } from 'express';
const router = Router();

import { addPetImages, listPetImage, updatePetImages } from '../controllers/petImage.controller';

router.post('/api/pet/images', addPetImages);
router.get('/api/pet/listImages', listPetImage);
router.post('/api/pet/updateImage', updatePetImages);

import { addUserImages, listUserImage, updateUserImages } from '../controllers/userImage.controller';

router.post('/api/user/addUserImages', addUserImages);
router.get('/api/user/listUserImage', listUserImage);
router.post('/api/user/updateUserImages', updateUserImages);

export default router;
