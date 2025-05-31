import express from 'express';
import { auth, authorize } from '../middleware/auth.js';
import Order from '../models/Order.js';
import User from '../models/User.js';
import MealPackage from '../models/MealPackage.js';

const router = express.Router();

// Get admin dashboard stats
router.get('/stats', auth, authorize('admin'), async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const totalUsers = await User.countDocuments();
    const totalRevenue = await Order.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: '$price.total' }
        }
      }
    ]);

    res.json({
      totalOrders,
      totalUsers,
      totalRevenue: totalRevenue[0]?.total || 0,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get recent orders
router.get('/orders/recent', auth, authorize('admin'), async (req, res) => {
  try {
    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .populate('user', 'name')
      .populate('mealPackage', 'name');
    
    res.json(recentOrders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get monthly sales data
router.get('/sales/monthly', auth, authorize('admin'), async (req, res) => {
  try {
    const monthlySales = await Order.aggregate([
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          total: { $sum: '$price.total' },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': -1, '_id.month': -1 } },
      { $limit: 12 }
    ]);

    res.json(monthlySales);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get popular meals
router.get('/meals/popular', auth, authorize('admin'), async (req, res) => {
  try {
    const popularMeals = await Order.aggregate([
      {
        $group: {
          _id: '$mealPackage',
          count: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: 'mealpackages',
          localField: '_id',
          foreignField: '_id',
          as: 'mealDetails'
        }
      },
      { $unwind: '$mealDetails' },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);

    res.json(popularMeals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;