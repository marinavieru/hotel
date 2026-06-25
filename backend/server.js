import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config();
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import roomRoutes from './routes/roomRoutes.js';
import userRoutes from './routes/userRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
<<<<<<< HEAD
import { stripeWebhook } from './controllers/bookingController.js';
=======
>>>>>>> 24ad1938caec98c3a77ed78e2edb4c8800391ff4

const port = process.env.PORT || 5000;

connectDB();

const app = express();

<<<<<<< HEAD
app.post(
  '/api/bookings/webhook',
  express.raw({ type: 'application/json' }),
  stripeWebhook
);

=======
// Body parsers
>>>>>>> 24ad1938caec98c3a77ed78e2edb4c8800391ff4
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

<<<<<<< HEAD
=======
// Rute normale
>>>>>>> 24ad1938caec98c3a77ed78e2edb4c8800391ff4
app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/rooms', roomRoutes);
app.use('/api/users', userRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/upload', uploadRoutes);

<<<<<<< HEAD

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.use(notFound);
app.use(errorHandler);

=======
// PayPal config (dacă îl folosești)
app.get('/api/config/paypal', (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);

// Static uploads
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// Error handlers
app.use(notFound);
app.use(errorHandler);

// Start server
>>>>>>> 24ad1938caec98c3a77ed78e2edb4c8800391ff4
app.listen(port, () => console.log(`Server running on port ${port}`));
