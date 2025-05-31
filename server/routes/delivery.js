import express from 'express';
import { auth } from '../middleware/auth.js';
import Order from '../models/Order.js';
import { sendPushNotification } from './notifications.js';

const router = express.Router();

// Get delivery status
router.get('/status/:orderId', auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId)
      .select('status deliveryLocation scheduledFor');
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update delivery location
router.post('/location/:orderId', auth, async (req, res) => {
  try {
    const { lat, lng } = req.body;
    const io = req.app.get('io');
    
    const order = await Order.findByIdAndUpdate(
      req.params.orderId,
      {
        $set: {
          deliveryLocation: {
            type: 'Point',
            coordinates: [lng, lat]
          }
        }
      },
      { new: true }
    ).populate('user');

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Emit location update via Socket.IO
    io.to(`order-${order._id}`).emit('location-update', {
      orderId: order._id,
      location: { lat, lng }
    });

    // Send push notification
    await sendPushNotification(order.user._id, {
      title: 'Delivery Update',
      body: 'Your order location has been updated',
      data: { orderId: order._id }
    });

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;