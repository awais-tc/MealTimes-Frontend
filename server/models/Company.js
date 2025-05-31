import mongoose from 'mongoose';

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
  },
  subscription: {
    plan: {
      type: String,
      enum: ['basic', 'premium', 'enterprise'],
      required: true,
    },
    startDate: Date,
    endDate: Date,
    status: {
      type: String,
      enum: ['active', 'inactive', 'pending'],
      default: 'pending',
    },
  },
  employees: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  mealPackages: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MealPackage',
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

const Company = mongoose.model('Company', companySchema);

export default Company;