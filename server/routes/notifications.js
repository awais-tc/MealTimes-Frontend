import express from 'express';
import webpush from 'web-push';
import { auth } from '../middleware/auth.js';
import User from '../models/User.js';

const router = express.Router();

// Save push subscription
router.post('/subscribe', auth, async (req, res) => {
  try {
    const subscription = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $set: { pushSubscription: subscription } },
      { new: true }
    );

    res.json({ message: 'Push subscription saved' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Send push notification
export const sendPushNotification = async (userId, notification) => {
  try {
    const user = await User.findById(userId);
    if (!user?.pushSubscription) return;

    await webpush.sendNotification(
      user.pushSubscription,
      JSON.stringify(notification)
    );
  } catch (error) {
    console.error('Push notification error:', error);
  }
};

export default router;