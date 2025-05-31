import express from 'express';
import { auth, authorize } from '../middleware/auth.js';
import MealPackage from '../models/MealPackage.js';

const router = express.Router();

// Get all meal packages
router.get('/', async (req, res) => {
  try {
    const meals = await MealPackage.find({ active: true })
      .populate('chef', 'name');
    res.json(meals);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Create meal package (chef only)
router.post('/', auth, authorize('chef'), async (req, res) => {
  try {
    const mealPackage = new MealPackage({
      ...req.body,
      chef: req.user._id,
    });
    await mealPackage.save();
    res.status(201).json(mealPackage);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update meal package
router.patch('/:id', auth, authorize('chef'), async (req, res) => {
  try {
    const meal = await MealPackage.findOne({
      _id: req.params.id,
      chef: req.user._id,
    });

    if (!meal) {
      return res.status(404).json({ error: 'Meal package not found' });
    }

    Object.assign(meal, req.body);
    await meal.save();
    res.json(meal);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;