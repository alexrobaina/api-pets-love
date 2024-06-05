import { Request, Response } from 'express';
import * as inventoryService from './services/inventory.service';
import { splitImagesByDeleted } from '../petCases/updatePet';
import { deleteFiles } from '../../services/deleteFiles';

export const createInventory = async (req: Request, res: Response) => {
  // @ts-ignore
  const createdBy = req?.user?.id as string;
  let images = [];
  if (res.locals.file?.newImages?.url) images = [res.locals.file.newImages?.url];
  if (res.locals.file?.newImages?.urls) images = res.locals.file.newImages?.urls;

  delete req.body.newImages;

  const parsedData = {
    ...req.body,
    images: images,
    userId: createdBy,
    name: req.body.name,
    type: req.body.type,
    price: parseFloat(req.body.price),
    description: req.body.description,
    quantity: parseInt(req.body.quantity),
  };

  try {
    const inventory = await inventoryService.createInventory(parsedData);
    res.status(201).json(inventory);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
export const updateInventory = async (req: Request, res: Response) => {
  // @ts-ignore
  const createdBy = req?.user?.id as string;
  const { inventoryId } = req.params;

  let deleteImages = [];
  try {
    deleteImages = req.body?.deleteFiles ? JSON.parse(req.body.deleteFiles) : [];
  } catch (error) {
    console.error('Failed to parse deleteFiles:', error);
  }

  const { deletedUrls, notDeletedUrls } = splitImagesByDeleted(deleteImages);

  if (deletedUrls.length > 0) {
    deleteFiles(deletedUrls, req.originalUrl);
  }

  console.log('deletedUrls', deletedUrls);

  let images = [];
  if (res.locals.file?.newImages?.url) images = [res.locals.file.newImages?.url];
  if (res.locals.file?.newImages?.urls) images = res.locals.file.newImages?.urls;
  console.log('images', images);

  let existingImages = [];
  try {
    if (req.body.images) {
      existingImages = JSON.parse(req.body.images).filter(Boolean); // Filter out null or undefined
    }
  } catch (error) {
    console.error('Failed to parse images:', error);
  }

  // Filter out deleted URLs from existing images
  const filteredExistingImages = existingImages.filter(
    (img: any) => !deletedUrls.includes(img.url)
  );
  // Combine the filtered existing images and the new images
  const allImages = [...filteredExistingImages, ...images];
  console.log('allImages', allImages);

  delete req.body.newImages;
  delete req.body.deleteFiles;

  const parsedData = {
    ...req.body,
    userId: createdBy,
    name: req.body.name,
    type: req.body.type,
    description: req.body.description,
    images: allImages,
    price: parseFloat(req.body.price || '0'),
    quantity: parseInt(req.body.quantity || '0'),
  };

  try {
    const inventory = await inventoryService.updateInventory(inventoryId, parsedData);
    res.status(201).json(inventory);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const deleteInventory = async (req: Request, res: Response) => {
  try {
    const { inventoryId } = req.params;
    const inventory = await inventoryService.deleteInventory(inventoryId);
    res.status(200).json(inventory);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getInventory = async (req: Request, res: Response) => {
  try {
    const { inventoryId } = req.params;
    const inventory = await inventoryService.getInventory(inventoryId);
    res.status(200).json(inventory);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getInventories = async (req: Request, res: Response) => {
  try {
    const { page, name, quantity, inventoryType } = req.query;

    const inventories = {
      // @ts-ignore
      data: await inventoryService.getInventories(page, name, quantity, inventoryType),
      // @ts-ignore
      total: await inventoryService.getInventoriesTotal(name, quantity, inventoryType),
    };
    res.status(200).json(inventories);
  } catch (error: any) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};
