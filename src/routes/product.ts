import express from 'express';
import { getProduct } from '../useCases/productCase/getProduct';
const router = express.Router();

router.get('/products/', getProduct);

export default router;
