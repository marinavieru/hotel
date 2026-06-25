import express from 'express';
import {
  createCheckoutSession,
  getBookings,
  getMyBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
} from '../controllers/bookingController.js';

import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, admin, getBookings);

router.get('/mybookings', protect, getMyBookings);

router.post('/checkout-session', protect, createCheckoutSession);

router
  .route('/:id')
  .get(protect, getBookingById)
  .put(protect, admin, updateBooking)
  .delete(protect, admin, deleteBooking);

export default router;
