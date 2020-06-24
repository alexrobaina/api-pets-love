import { Router } from 'express';
const router = Router();

import { addImages, listImage } from '../controllers/image.controller';

router.post('/api/pet/images', addImages);
router.get('/api/pet/listImages', listImage);

export default router;
