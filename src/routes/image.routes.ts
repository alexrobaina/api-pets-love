import { Router } from 'express';
const router = Router();

import { addImages, listImage, updateImages } from '../controllers/image.controller';

router.post('/api/pet/images', addImages);
router.get('/api/pet/listImages', listImage);
router.post('/api/pet/updateImage', updateImages);

export default router;
