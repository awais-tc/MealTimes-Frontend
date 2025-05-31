import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  userId: {
    type: Number,
    required: true,
    unique: true,
    auto: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'homeChef', 'corporateEmployee'],
    required: true
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: function() {
      return this.role === 'corporateEmployee';
    }
  },
  department: {
    type: String,
    required: function() {
      return this.role === 'corporateEmployee';
    }
  },
  specialty: {
    type: String,
    required: function() {
      return this.role === 'homeChef';
    }
  },
  pushSubscription: {
    type: Object
  }
});

// Password hashing middleware
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Login method
userSchema.methods.login = async function(password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;