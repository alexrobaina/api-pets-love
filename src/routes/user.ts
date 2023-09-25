import express from 'express';
import { create, getUser, getUsers, updateUser } from '../useCases/userCases/userController';
// import { verifyRole_Admin, verifyToken } from '../middlewares/auth';

const router = express.Router();

router.post('/user/', create); // CREATE USER

router.patch('/user/', updateUser); // UPDATE USER

router.get('/users/', getUsers); // GET USERS

router.get('/user/', getUser); // GET USER

// router.delete('/user', [verifyToken, verifyRole_Admin], Delete); // DELETE USERS

export default router;
