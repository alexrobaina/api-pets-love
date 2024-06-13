import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createExpense = async (data: any, userId: string) => {
  const { items, totalAmount, type, category, description, title } = data;

  // Check inventory stock
  for (const item of items) {
    if (item.inventoryId) {
      const inventoryItem = await prisma.inventory.findUnique({
        where: { id: item.inventoryId },
      });
      if (inventoryItem && inventoryItem.quantity < item.quantity) {
        throw new Error(`Insufficient stock for inventory item: ${inventoryItem.name}`);
      }
    }
  }

  // Create expense
  const expense = await prisma.expense.create({
    data: {
      totalAmount,
      type,
      title,
      category,
      description,
      userId,
      items: {
        create: items.map((item: any) => ({
          title: item.title,
          quantity: parseInt(item.quantity),
          price: parseFloat(item.price),
          inventoryId: item.inventoryId || null,
        })),
      },
    },
  });

  // Update inventory
  for (const item of items) {
    if (item.inventoryId) {
      await prisma.inventory.update({
        where: { id: item.inventoryId },
        data: { quantity: { decrement: parseInt(item.quantity) } },
      });
    }
  }

  return expense;
};

export const updateExpense = async (id: string, data: any, userId: string) => {
  const { items, totalAmount, type, category, description, title } = data;

  if (!items || !Array.isArray(items)) {
    throw new Error('Invalid or missing items format');
  }

  // Check inventory stock
  for (const item of items) {
    if (item.inventoryId) {
      const inventoryItem = await prisma.inventory.findUnique({
        where: { id: item.inventoryId },
      });
      if (!inventoryItem) {
        throw new Error(`Inventory item not found: ${item.inventoryId}`);
      }
      if (inventoryItem.quantity < item.quantity) {
        throw new Error(`Insufficient stock for inventory item: ${inventoryItem.name}`);
      }
    }
  }

  // Fetch existing items to manage inventory adjustments
  const existingItems = await prisma.expenseItem.findMany({
    where: { expenseId: id },
  });

  // Revert inventory changes from existing items
  for (const item of existingItems) {
    if (item.inventoryId) {
      await prisma.inventory.update({
        where: { id: item.inventoryId },
        data: { quantity: { increment: item.quantity } },
      });
    }
  }

  // Delete existing items
  await prisma.expenseItem.deleteMany({
    where: { expenseId: id },
  });

  // Update expense
  const expense = await prisma.expense.update({
    where: { id },
    data: {
      totalAmount,
      type,
      title,
      category,
      description,
      userId,
      items: {
        create: items.map((item: any) => ({
          title: item.title,
          quantity: parseInt(item.quantity),
          price: parseFloat(item.price),
          inventoryId: item.inventoryId || null, // Ensure null for non-existent inventoryId
        })),
      },
    },
  });

  // Update inventory with new items
  for (const item of items) {
    if (item.inventoryId) {
      await prisma.inventory.update({
        where: { id: item.inventoryId },
        data: { quantity: { decrement: parseInt(item.quantity) } },
      });
    }
  }

  return expense;
};

export const deleteExpense = async (id: string) => {
  // Fetch associated ExpenseItem records
  const expenseItems = await prisma.expenseItem.findMany({
    where: { expenseId: id },
  });

  // Check and update inventory if needed
  for (const item of expenseItems) {
    if (item.inventoryId) {
      // Assuming you have a field `quantity` in your inventory model
      await prisma.inventory.update({
        where: { id: item.inventoryId },
        data: {
          quantity: {
            // Adjust this logic according to your inventory update needs
            increment: item.quantity,
          },
        },
      });
    }
  }

  // Delete associated ExpenseItem records
  await prisma.expenseItem.deleteMany({
    where: { expenseId: id },
  });

  // Delete the Expense
  return prisma.expense.delete({
    where: { id },
  });
};

export const getAnalytics = async (userId: string) => {
  const totalIncome = await prisma.expense.aggregate({
    _sum: {
      totalAmount: true,
    },
    where: {
      userId,
      type: 'INCOME',
    },
  });

  const totalExpense = await prisma.expense.aggregate({
    _sum: {
      totalAmount: true,
    },
    where: {
      userId,
      type: 'EXPENSE',
    },
  });

  const monthlyIncome = await prisma.expense.groupBy({
    by: ['type', 'category'],
    _sum: {
      totalAmount: true,
    },
    where: {
      userId,
      type: 'INCOME',
    },
  });

  const monthlyExpense = await prisma.expense.groupBy({
    by: ['type', 'category'],
    _sum: {
      totalAmount: true,
    },
    where: {
      userId,
      type: 'EXPENSE',
    },
  });

  const categoryExpenses = await prisma.expense.groupBy({
    by: ['category'],
    _sum: {
      totalAmount: true,
    },
    where: {
      userId,
      type: 'EXPENSE',
    },
  });

  const recentTransactions = await prisma.expense.findMany({
    where: {
      userId,
    },
    orderBy: {
      date: 'desc',
    },
    take: 10,
  });

  return {
    totalIncome: totalIncome._sum.totalAmount,
    totalExpense: totalExpense._sum.totalAmount,
    monthlyIncome,
    monthlyExpense,
    categoryExpenses,
    recentTransactions,
  };
};

export const getExpenseById = async (id: string) => {
  return prisma.expense.findUnique({
    where: { id },
    include: { items: true },
  });
};

export const listExpenses = async () => {
  return prisma.expense.findMany({
    include: { items: true },
  });
};

export const getExpenses = async (filters: {
  page: string;
  amount: string;
  title: string;
  category: string;
  startDate: string;
  endDate: string;
  type: string;
  userId: string;
}) => {
  const { page, amount, title, category, startDate, endDate, type, userId } = filters;
  const itemsPerPage = 10;
  const currentPage = parseInt(page);
  const skip = (currentPage - 1) * itemsPerPage;
  const take = itemsPerPage;

  let query: any = {
    where: { userId },
    orderBy: { createdAt: 'desc' },
    skip,
    take,
  };

  if (amount) {
    query.where.amount = parseFloat(amount);
  }
  if (title) {
    query.where.title = { contains: title };
  }
  if (category) {
    query.where.category = { contains: category };
  }
  if (type) {
    query.where.type = type;
  }

  if (startDate) {
    const start = formatDateForQuery(startDate);
    const end = endDate ? formatEndDateForQuery(endDate) : formatEndDateForQuery(startDate);
    query.where.date = {
      gte: start,
      lte: end,
    };
  }

  query.where = cleanObject(query.where);

  return prisma.expense.findMany(query);
};

export const getExpensesTotal = async (filters: {
  amount: string;
  title: string;
  category: string;
  startDate: string;
  endDate: string;
  type: string;
  userId: string;
}) => {
  const { amount, title, category, startDate, endDate, type, userId } = filters;
  let query: any = {
    where: { userId },
    orderBy: { createdAt: 'desc' },
  };

  if (amount) {
    query.where.amount = parseFloat(amount);
  }
  if (title) {
    query.where.title = { contains: title };
  }
  if (category) {
    query.where.category = { contains: category };
  }
  if (type) {
    query.where.type = type;
  }

  if (startDate) {
    const start = formatDateForQuery(startDate);

    const end = endDate ? formatEndDateForQuery(endDate) : formatEndDateForQuery(startDate);
    query.where.date = {
      gte: start,
      lte: end,
    };
    console.log('start', start);
    console.log('end', end);
  }
  query.where = cleanObject(query.where);

  return prisma.expense.count(query);
};

// Utility function to remove undefined properties from an object
const cleanObject = (obj: any) => {
  return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v !== undefined));
};

const formatDateForQuery = (timestamp: string): Date => {
  const date = new Date(timestamp);
  date.setHours(0, 0, 0, 0).toString(); // Set to start of the day
  return date;
};

const formatEndDateForQuery = (timestamp: string): Date => {
  const date = new Date(timestamp);
  date.setHours(23, 59, 59, 999).toString(); // Set to end of the day
  return date;
};
