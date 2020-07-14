import { Router } from 'express';
import singleUpload from "../middlewares/awsStorageImage";
const router = Router();


import { addPetImages, listPetImage, updatePetImages } from '../controllers/petImage.controller';

router.post('/api/pet/images', singleUpload, addPetImages);
router.get('/api/pet/listImages', listPetImage);
router.post('/api/pet/updateImage', updatePetImages);

import { addUserImages, listUserImage, updateUserImages } from '../controllers/userImage.controller';
import upload from "../services/file-upload";

router.post('/api/user/addUserImages', singleUpload, addUserImages);
router.get('/api/user/listUserImage', listUserImage);
router.post('/api/user/updateUserImages', singleUpload, updateUserImages);

export default router;
