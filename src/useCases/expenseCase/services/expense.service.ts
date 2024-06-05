import { prisma } from '../../../database/prisma'

export const createExpense = async (data: any, veterinaryId: string) => {
  return prisma.expense.create({
    data: {
      ...data,
      veterinaryId,
    },
  })
}

export const updateExpense = async (id: string, data: any) => {
  return prisma.expense.update({
    where: { id },
    data,
  })
}

export const deleteExpense = async (id: string) => {
  return prisma.expense.delete({
    where: { id },
  })
}

export const getExpenseById = async (id: string) => {
  return prisma.expense.findUnique({
    where: { id },
  })
}

export const listExpenses = async () => {
  return prisma.expense.findMany()
}
