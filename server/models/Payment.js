import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  paymentId: {
    type: Number,
    required: true,
    unique: true,
    auto: true
  },
  amount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending'
  },
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true
  },
  stripePaymentIntentId: String
});

paymentSchema.methods.processPayment = async function() {
  // Implementation for processing payment through Stripe
  // This will be handled in the payment service
};

const Payment = mongoose.model('Payment', paymentSchema);
export default Payment;