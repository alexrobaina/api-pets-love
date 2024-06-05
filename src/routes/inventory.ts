import {
  createInventory,
  updateInventory,
  getInventories,
  getInventory,
  deleteInventory,
} from '../useCases/inventoryCase/inventory.controller'
import express from 'express'

import { verifyToken } from '../middlewares/auth'
import { createCloudUploader } from '../middlewares/cloudUploader'

const uploadImagesInventory = createCloudUploader('newImages')

const router = express.Router()

// CREATE INVENTORY ITEM
router.post('/inventory', [verifyToken, uploadImagesInventory], createInventory)

// UPDATE INVENTORY ITEM
router.put(
  '/inventory/:inventoryId',
  [verifyToken, uploadImagesInventory],
  updateInventory,
)

// GET ALL INVENTORY ITEMS
router.get('/inventory', [verifyToken], getInventories)

// GET INVENTORY ITEM BY ID
router.get('/inventory/:inventoryId', [verifyToken], getInventory)

// DELETE INVENTORY ITEM BY ID
router.delete('/inventory/:inventoryId', [verifyToken], deleteInventory)

export default router
