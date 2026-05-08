import express from 'express';
import {
  createBooking,
  getBookings,
  getMyBookings,
  getBookingById,
  createCheckoutSession,
  updateBooking,
  deleteBooking,
} from '../controllers/bookingController.js';

import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// ADMIN: get all bookings + create booking
router.route('/')
  .get(protect, admin, getBookings)
  .post(protect, createBooking);

// USER: get only his own bookings
router.route('/mybookings')
  .get(protect, getMyBookings);

// ADMIN + USER: get booking details
router.route('/:id')
  .get(protect, getBookingById)
  .put(protect, admin, updateBooking)     // admin update
  .delete(protect, admin, deleteBooking); // admin delete

// USER: Stripe checkout
router.route('/:id/pay')
  .post(protect, createCheckoutSession);

export default router;
