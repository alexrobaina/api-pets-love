import { Request, Response } from 'express'
import * as expenseService from './services/expense.service'

export const createExpense = async (req: any, res: Response) => {
  const userId = req?.user?.id as string
  try {
    const expense = await expenseService.createExpense(req.body, userId)
    res.status(201).json(expense)
  } catch (error: any) {
    console.log(error)
    res.status(500).json({ error: error.message })
  }
}

export const updateExpense = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const expense = await expenseService.updateExpense(id, req.body)
    res.status(200).json(expense)
  } catch (error: any) {
    console.log(error)
    res.status(500).json({ error: error.message })
  }
}

export const deleteExpense = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const expense = await expenseService.deleteExpense(id)
    res.status(200).json(expense)
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}

export const getExpenseById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const expense = await expenseService.getExpenseById(id)
    res.status(200).json(expense)
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}

export const listExpenses = async (_req: Request, res: Response) => {
  try {
    const expenses = await expenseService.listExpenses()
    res.status(200).json(expenses)
  } catch (error: any) {
    console.log(error)
    res.status(400).json({ error: error.message })
  }
}
