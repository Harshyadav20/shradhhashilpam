import express from 'express';
const router = express.Router();
import { protect } from '../middleware/auth.js';
import Order from '../models/Order.js';
import Asset from '../models/Asset.js';
import User from '../models/User.js';

export const createOrder = async (req, res) => {
  try {
    const { assets: assetIds } = req.body;

    if (!assetIds || !Array.isArray(assetIds) || assetIds.length === 0) {
      return res.status(400).json({ success: false, message: 'Please provide assets' });
    }

    const assets = await Asset.find({ _id: { $in: assetIds } });
    
    if (assets.length !== assetIds.length) {
      return res.status(404).json({ success: false, message: 'Some assets not found' });
    }

    let totalAmount = 0;
    const orderAssets = assets.map(asset => {
      const finalPrice = asset.discountPrice || asset.price;
      totalAmount += finalPrice;
      return {
        asset: asset._id,
        title: asset.title,
        price: asset.price,
        discountPrice: finalPrice
      };
    });

    const order = await Order.create({
      user: req.user._id,
      assets: orderAssets,
      totalAmount,
      paymentMethod: req.body.paymentMethod || 'stripe'
    });

    res.status(201).json({
      success: true,
      data: order
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate('assets.asset', 'title thumbnail')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

export const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('assets.asset', 'title thumbnail downloadUrl');

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    if (order.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    res.json({
      success: true,
      data: order
    });
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

export const completeOrder = async (req, res) => {
  try {
    const { paymentIntentId } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    if (order.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    order.paymentStatus = 'completed';
    order.status = 'completed';
    order.stripePaymentIntentId = paymentIntentId;

    await order.save();

    // Add assets to user's purchased assets
    await User.findByIdAndUpdate(req.user._id, {
      $addToSet: { purchasedAssets: { $each: order.assets.map(a => a.asset) } }
    });

    // Increment download count for each asset
    for (const assetItem of order.assets) {
      await Asset.findByIdAndUpdate(assetItem.asset, {
        $inc: { downloads: 1 }
      });
    }

    res.json({
      success: true,
      data: order
    });
  } catch (error) {
    console.error('Complete order error:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

router.post('/', protect, createOrder);
router.get('/', protect, getOrders);
router.get('/:id', protect, getOrder);
router.post('/:id/complete', protect, completeOrder);

export default router;
