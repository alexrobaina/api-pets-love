import {
  createExpense,
  updateExpense,
  deleteExpense,
  getExpenseById,
  expensesAnalytics,
  listExpensesByUser,
} from '../useCases/expenseCase/expense.controller';
import express from 'express';

import { verifyToken } from '../middlewares/auth';

const router = express.Router();

// CREATE EXPENSE ITEM
router.post('/expense', [verifyToken], createExpense);

// UPDATE EXPENSE ITEM
router.put('/expense/:expenseId', [verifyToken], updateExpense);

// GET ALL EXPENSE ITEMS
router.get('/expenses', [verifyToken], listExpensesByUser);

router.get('/expenses/analytics', [verifyToken], expensesAnalytics);

// GET EXPENSE ITEM BY ID
router.get('/expense/:expenseId', [verifyToken], getExpenseById);

// DELETE EXPENSE ITEM BY ID
router.delete('/expense/:expenseId', [verifyToken], deleteExpense);

export default router;
