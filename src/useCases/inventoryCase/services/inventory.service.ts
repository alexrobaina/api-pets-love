import { PrismaClient } from '@prisma/client';
import { log } from 'console';

const prisma = new PrismaClient();

export const createInventory = async (data: any) => {
  return prisma.inventory.create({
    data: {
      ...data,
      price: parseFloat(data.price),
      quantity: parseInt(data.quantity, 10),
      images: Array.isArray(data.images) ? data.images : [],
    },
  });
};

export const updateInventory = async (id: string, data: any) => {
  return prisma.inventory.update({
    where: { id },
    data: {
      ...data,
      images: data.images.filter(Boolean), // Filter out null or undefined
    },
  });
};

export const deleteInventory = async (id: string) => {
  return prisma.inventory.delete({
    where: { id },
  });
};

export const getInventory = async (id: string) => {
  return prisma.inventory.findUnique({
    where: { id },
  });
};

export const getInventories = async (
  page: string,
  name: string,
  quantity: string,
  inventoryType: string
) => {
  const itemsPerPage = 10;
  const currentPage = parseInt(page);
  // Calculate skip and take based on currentPage
  const skip = (currentPage - 1) * itemsPerPage;
  const take = itemsPerPage;

  let query: any = {
    where: {},
    orderBy: { createdAt: 'desc' },
    skip,
    take,
  };

  if (name) {
    query.where.name = { contains: name };
  }
  if (quantity) {
    if (!query.where.OR) query.where.OR = [];
    query.where.OR.push({ quantity: parseInt(quantity) });
  }
  if (inventoryType) {
    if (!query.where.OR) query.where.OR = [];
    query.where.OR.push({ type: inventoryType });
  }

  query.where = cleanObject(query.where);

  return prisma.inventory.findMany(query);
};

export const getInventoriesTotal = async (
  name: string,
  quantity: string,
  inventoryType: string
) => {
  let query: any = {
    where: {},
    orderBy: { createdAt: 'desc' },
  };

  if (name) {
    query.where.name = { contains: name };
  }
  if (quantity) {
    if (!query.where.OR) query.where.OR = [];
    query.where.OR.push({ quantity: parseInt(quantity) });
  }
  if (inventoryType) {
    if (!query.where.OR) query.where.OR = [];
    query.where.OR.push({ type: inventoryType });
  }

  query.where = cleanObject(query.where);

  return prisma.inventory.count(query);
};

// Utility function to remove undefined properties from an object
const cleanObject = (obj: any) => {
  return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v !== undefined));
};
