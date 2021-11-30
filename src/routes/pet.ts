import express from 'express';
import { create, getPet, getPets, update, Delete } from '../petCases/petController';
import { verificaToken, verificaRole_Admin } from '../middlewares/auth';

const router = express.Router();

router.post('/pet/', [verificaToken], create); // POST USER

router.get('/pets/', [verificaToken], getPets); // GET USERS

router.get('/pet', [verificaToken], getPet); // GET USER

router.delete('/pet', Delete); // DELETE USERS

router.put('/pet', [verificaToken], update); // PUT USER

export default router;
