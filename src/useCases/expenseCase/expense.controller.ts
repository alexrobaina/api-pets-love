import { getAnalytics } from './../analytics/analytics.controller';
import { Request, Response } from 'express';
import * as expenseService from './services/expense.service';

export const createExpense = async (req: Request, res: Response) => {
  // @ts-ignore
  const createdBy = req?.user?.id as string;
  try {
    const expense = await expenseService.createExpense(req.body, createdBy);
    res.status(201).json(expense);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const updateExpense = async (req: Request, res: Response) => {
  const { expenseId } = req.params;
  // @ts-ignore
  const updatedBy = req?.user?.id as string;
  try {
    const expense = await expenseService.updateExpense(expenseId, req.body, updatedBy);
    res.status(200).json(expense);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const deleteExpense = async (req: Request, res: Response) => {
  try {
    const { expenseId } = req.params;
    await expenseService.deleteExpense(expenseId);
    res.status(200).json({ message: 'Expense deleted successfully' });
  } catch (error: any) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

export const getExpenseById = async (req: Request, res: Response) => {
  try {
    const { expenseId } = req.params;
    const expense = await expenseService.getExpenseById(expenseId);
    res.status(200).json(expense);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const listExpenses = async (_req: Request, res: Response) => {
  try {
    const expenses = await expenseService.listExpenses();
    res.status(200).json(expenses);
  } catch (error: any) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

export const listExpensesByUser = async (req: any, res: Response) => {
  const userId: string = req.user?.id;

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  const { page, amount, title, category, startDate, endDate, type } = req.query;

  try {
    const expenses = {
      data: await expenseService.getExpenses({
        page,
        amount,
        title,
        category,
        startDate,
        endDate,
        type,
        userId,
      }),
      total: await expenseService.getExpensesTotal({
        amount,
        title,
        category,
        startDate,
        endDate,
        type,
        userId,
      }),
    };
    res.status(200).json(expenses);
  } catch (error: any) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

export const expensesAnalytics = async (req: any, res: Response) => {
  const userId: string = req.user?.id;

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  try {
    const expenses = await expenseService.getAnalytics(userId);
    res.status(200).json(expenses);
  } catch (error: any) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};
