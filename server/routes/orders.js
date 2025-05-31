import express from 'express';
import { auth, authorize } from '../middleware/auth.js';
import Order from '../models/Order.js';
import MealPackage from '../models/MealPackage.js';

const router = express.Router();

// Create order
router.post('/', auth, authorize('employee'), async (req, res) => {
  try {
    const { mealPackageId, scheduledFor, specialInstructions } = req.body;

    const mealPackage = await MealPackage.findById(mealPackageId);
    if (!mealPackage) {
      return res.status(404).json({ error: 'Meal package not found' });
    }

    const order = new Order({
      user: req.user._id,
      company: req.user.company,
      mealPackage: mealPackageId,
      scheduledFor,
      specialInstructions,
      price: {
        subtotal: mealPackage.price,
        deliveryFee: 5, // Example delivery fee
        total: mealPackage.price + 5,
      },
    });

    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get user orders
router.get('/my-orders', auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate('mealPackage')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update order status (chef only)
router.patch('/:id/status', auth, authorize('chef'), async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id)
      .populate('mealPackage');

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    if (order.mealPackage.chef.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    order.status = status;
    await order.save();
    res.json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;