import asyncHandler from '../middleware/asyncHandler.js';
import Booking from '../models/bookingModel.js';
import Stripe from 'stripe';
import Room from '../models/roomModel.js';
// USER: Create Stripe Checkout Session
export const createCheckoutSession = asyncHandler(async (req, res) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  const booking = await Booking.findById(req.params.id).populate('room');

  if (!booking) {
    res.status(404);
    throw new Error('Booking not found');
  }

const session = await stripe.checkout.sessions.create({
  payment_method_types: ['card'],
  mode: 'payment',
  line_items: [
    {
      price_data: {
        currency: 'ron',
        product_data: { name: booking.room.name },
        unit_amount: booking.totalPrice * 100,
      },
      quantity: 1,
    },
  ],
  metadata: {
    bookingId: booking._id.toString(),
  },
  success_url: `${process.env.FRONTEND_URL}/booking/${booking._id}/success`,
  cancel_url: `${process.env.FRONTEND_URL}/booking/${booking._id}/pay`,
});

  res.json({ url: session.url });
});

// ADMIN: get all bookings
export const getBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({})
    .populate('user', 'name email')
.populate('room', 'name roomType price')

  res.json(bookings);
});

// USER: get only his own bookings
export const getMyBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id })
.populate('room', 'name roomType price image')

  res.json(bookings);
});

// USER: get booking by ID
export const getBookingById = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id)
  .populate('room', 'name roomType price image description')
  .populate('user', 'name email');

  if (!booking) {
    res.status(404);
    throw new Error('Booking not found');
  }

  if (booking.user._id.toString() !== req.user._id.toString() && !req.user.isAdmin) {
    res.status(401);
    throw new Error('Not authorized to view this booking');
  }

  res.json(booking);
});

// USER: create booking
export const createBooking = asyncHandler(async (req, res) => {
  const { roomId, checkIn, checkOut, totalPrice } = req.body;

  // Verificăm dacă camera există
  const roomExists = await Room.findById(roomId);
  if (!roomExists) {
    res.status(400);
    throw new Error('Room does not exist');
  }

  const booking = await Booking.create({
    user: req.user._id,
    room: roomId,
    checkIn,
    checkOut,
    totalPrice,
    status: 'pending',
  });

  res.status(201).json(booking);
});


// ADMIN: update booking
export const updateBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    res.status(404);
    throw new Error('Booking not found');
  }

  // Acceptăm doar status valid
  if (req.body.status && !['pending', 'confirmed'].includes(req.body.status)) {
    res.status(400);
    throw new Error('Invalid status value');
  }

  booking.status = req.body.status ?? booking.status;
  booking.checkIn = req.body.checkIn ?? booking.checkIn;
  booking.checkOut = req.body.checkOut ?? booking.checkOut;

  const updatedBooking = await booking.save();
  res.json(updatedBooking);
});

// ADMIN: delete booking
export const deleteBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    res.status(404);
    throw new Error('Booking not found');
  }

  await booking.deleteOne();
  res.json({ message: 'Booking removed' });
});
