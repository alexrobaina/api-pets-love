import express from 'express';
import { create, getUser, getUsers } from '../useCases/userCases/userController';

const router = express.Router();

router.post('/user/', create); // POST USER

router.get('/users/', getUsers); // GET USERS

router.get('/user/', getUser); // GET USER

// router.delete('/user', [verifyToken, verifyRole_Admin], Delete); // DELETE USERS

// router.put('/user', [verifyToken, uploadImage], update); // PUT USER

export default router;
