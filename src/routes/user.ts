import express from 'express';
import { create, getUser, getUsers, updateUser } from '../useCases/userCases/userController';
import { googleCloudUploader } from '../middlewares/googleCloudUploader';
import { verifyToken } from '../middlewares/auth';
// import { verifyRole_Admin, verifyToken } from '../middlewares/auth';

const router = express.Router();

router.post('/user/', create); // CREATE USER

// This route need verifyToke
router.put('/user/', [googleCloudUploader], updateUser); // UPDATE USER

router.get('/users/', getUsers); // GET USERS

router.get('/user/', getUser); // GET USER

// router.delete('/user', [verifyToken, verifyRole_Admin], Delete); // DELETE USERS

export default router;
