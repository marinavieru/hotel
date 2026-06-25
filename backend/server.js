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
import { stripeWebhook } from './controllers/bookingController.js';

const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.post(
  '/api/bookings/webhook',
  express.raw({ type: 'application/json' }),
  stripeWebhook
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/rooms', roomRoutes);
app.use('/api/users', userRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/upload', uploadRoutes);


const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));
