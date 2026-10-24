import express from 'express';
const router = express.Router();
import { 
  getAssets, 
  getAsset, 
  createAsset, 
  updateAsset, 
  deleteAsset,
  incrementDownloads 
} from '../controllers/assetController.js';
import { protect, optionalAuth } from '../middleware/auth.js';

router.route('/')
  .get(optionalAuth, getAssets)
  .post(protect, createAsset);

router.route('/:id')
  .get(getAsset)
  .put(protect, updateAsset)
  .delete(protect, deleteAsset);

router.post('/:id/download', incrementDownloads);

export default router;
