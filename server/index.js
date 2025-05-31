import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { createServer } from 'http';
import { Server } from 'socket.io';
import webpush from 'web-push';
import authRoutes from './routes/auth.js';
import mealsRoutes from './routes/meals.js';
import ordersRoutes from './routes/orders.js';
import adminRoutes from './routes/admin.js';
import paymentsRoutes from './routes/payments.js';
import deliveryRoutes from './routes/delivery.js';
import notificationsRoutes from './routes/notifications.js';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
});

// Configure web-push
webpush.setVapidDetails(
  'mailto:test@example.com',
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

app.use(cors());
app.use(express.json());

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('Client connected');

  socket.on('join-delivery-tracking', (orderId) => {
    socket.join(`order-${orderId}`);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Make io available in routes
app.set('io', io);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.use('/auth', authRoutes);
app.use('/meals', mealsRoutes);
app.use('/orders', ordersRoutes);
app.use('/admin', adminRoutes);
app.use('/payments', paymentsRoutes);
app.use('/delivery', deliveryRoutes);
app.use('/notifications', notificationsRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Corporate Meal Management API' });
});

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});