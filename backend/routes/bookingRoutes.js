import express from 'express';
import {
<<<<<<< HEAD
  createCheckoutSession,
  getBookings,
  getMyBookings,
  getBookingById,
=======
  createBooking,
  getBookings,
  getMyBookings,
  getBookingById,
  createCheckoutSession,
>>>>>>> 24ad1938caec98c3a77ed78e2edb4c8800391ff4
  updateBooking,
  deleteBooking,
} from '../controllers/bookingController.js';

import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

<<<<<<< HEAD
router.get('/', protect, admin, getBookings);

router.get('/mybookings', protect, getMyBookings);

router.post('/checkout-session', protect, createCheckoutSession);

router
  .route('/:id')
  .get(protect, getBookingById)
  .put(protect, admin, updateBooking)
  .delete(protect, admin, deleteBooking);
=======
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
>>>>>>> 24ad1938caec98c3a77ed78e2edb4c8800391ff4

export default router;
