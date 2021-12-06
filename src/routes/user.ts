import express from 'express';
import {
  create,
  getUser,
  getUsers,
  update,
  Delete,
  login,
} from '../useCases/userCases/userController';
import { verificaToken, verificaRole_Admin } from '../middlewares/auth';

const router = express.Router();

router.post('/login/', login); // POST USER

router.post('/user/', create); // POST USER

router.get('/users/', getUsers); // GET USERS

router.get('/user', getUser); // GET USER

router.delete('/user', [verificaToken, verificaRole_Admin], Delete); // DELETE USERS

router.put('/user', update); // PUT USER

export default router;
