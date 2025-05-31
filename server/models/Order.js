import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  orderId: {
    type: Number,
    required: true,
    unique: true,
    auto: true
  },
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  meal: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Meal',
    required: true
  },
  deliveryStatus: {
    type: String,
    enum: ['pending', 'preparing', 'out_for_delivery', 'delivered'],
    default: 'pending'
  },
  scheduledDeliveryTime: {
    type: Date,
    required: true
  },
  payment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Payment'
  }
});

orderSchema.methods.scheduleDelivery = async function(deliveryTime) {
  this.scheduledDeliveryTime = deliveryTime;
  await this.save();
};

const Order = mongoose.model('Order', orderSchema);
export default Order;