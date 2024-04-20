import express from 'express';
import { pets } from '../useCases/seedCase/pets';
import { users } from '../useCases/seedCase/users';
import { createVaccines } from '../useCases/seedCase/createVaccines';
import { verifyRole_Admin } from '../middlewares/auth';

const router = express.Router();

router.post('/pets/', [verifyRole_Admin], pets);
router.post('/users/', [verifyRole_Admin], users);
router.post('/vaccines/', [verifyRole_Admin], createVaccines);

export default router;
