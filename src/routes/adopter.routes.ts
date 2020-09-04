import { Router } from 'express';
const router = Router();

import { getPetAdopter } from '../controllers/adopter.controller';

router.get('/api/adopter/listPetsAdopter', getPetAdopter);

export default router;
