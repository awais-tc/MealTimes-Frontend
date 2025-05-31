import mongoose from 'mongoose';

const mealPackageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  chef: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  description: String,
  price: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: ['breakfast', 'lunch', 'dinner'],
    required: true,
  },
  dietaryOptions: [{
    type: String,
    enum: ['vegetarian', 'vegan', 'gluten-free', 'dairy-free', 'nut-free'],
  }],
  nutritionalInfo: {
    calories: Number,
    protein: Number,
    carbs: Number,
    fat: Number,
  },
  availability: {
    daysAvailable: [{
      type: String,
      enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
    }],
    maxOrdersPerDay: Number,
  },
  active: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

const MealPackage = mongoose.model('MealPackage', mealPackageSchema);

export default MealPackage;