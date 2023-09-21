import express from 'express';
import { pets } from '../useCases/seedCase/pets';

const router = express.Router();

router.post('/pets/', pets);

export default router;
