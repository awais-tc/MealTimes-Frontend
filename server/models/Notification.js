import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  notificationId: {
    type: Number,
    required: true,
    unique: true,
    auto: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  message: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

notificationSchema.methods.sendNotification = async function() {
  // Implementation for sending push notification
  // This will be handled by the web-push library
};

const Notification = mongoose.model('Notification', notificationSchema);
export default Notification;