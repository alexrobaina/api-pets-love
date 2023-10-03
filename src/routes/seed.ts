import express from 'express';
import { pets } from '../useCases/seedCase/pets';
import { users } from '../useCases/seedCase/users';

const router = express.Router();

router.post('/pets/', pets);
router.post('/users/', users);

export default router;
