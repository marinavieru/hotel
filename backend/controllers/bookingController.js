import asyncHandler from '../middleware/asyncHandler.js';
import Booking from '../models/bookingModel.js';
import Stripe from 'stripe';
<<<<<<< HEAD
import Room from '../models/roomModel.js';

export const createCheckoutSession = asyncHandler(async (req, res) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  const { roomId, checkIn, checkOut, totalPrice } = req.body;

  const room = await Room.findById(roomId);
  if (!room) {
    res.status(400);
    throw new Error('Room does not exist');
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    line_items: [
      {
        price_data: {
          currency: 'ron',
          product_data: { name: room.name },
          unit_amount: totalPrice * 100,
        },
        quantity: 1,
      },
    ],
    metadata: {
      roomId,
      checkIn,
      checkOut,
      totalPrice,
      userId: req.user._id.toString(),
    },
    success_url: `${process.env.FRONTEND_URL}/booking/success`,
    cancel_url: `${process.env.FRONTEND_URL}/booking/cancel`,
  });
=======

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
>>>>>>> 24ad1938caec98c3a77ed78e2edb4c8800391ff4

  res.json({ url: session.url });
});

<<<<<<< HEAD

export const stripeWebhook = asyncHandler(async (req, res) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  const sig = req.headers['stripe-signature'];

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    const { roomId, checkIn, checkOut, totalPrice, userId } = session.metadata;

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    const conflict = await Booking.findOne({
      room: roomId,
      $or: [
        { checkIn: { $lt: checkOutDate }, checkOut: { $gt: checkInDate } }
      ]
    });

    if (!conflict) {
      await Booking.create({
        user: userId,
        room: roomId,
        checkIn: checkInDate,
        checkOut: checkOutDate,
        totalPrice,
        status: 'pending',
      });
    }
  }

  res.json({ received: true });
});


export const getBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({})
    .populate('user', 'name email')
    .populate('room', 'name roomType price');
=======
// ADMIN: get all bookings
export const getBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({})
    .populate('user', 'name email')
    .populate('room', 'name roomType');
>>>>>>> 24ad1938caec98c3a77ed78e2edb4c8800391ff4

  res.json(bookings);
});

<<<<<<< HEAD
export const getMyBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id })
    .populate('room', 'name roomType price image');
=======
// USER: get only his own bookings
export const getMyBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id })
    .populate('room', 'name roomType');
>>>>>>> 24ad1938caec98c3a77ed78e2edb4c8800391ff4

  res.json(bookings);
});

<<<<<<< HEAD
export const getBookingById = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id)
    .populate('room', 'name roomType price image description')
=======
// USER: get booking by ID
export const getBookingById = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id)
    .populate('room', 'name roomType price')
>>>>>>> 24ad1938caec98c3a77ed78e2edb4c8800391ff4
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

<<<<<<< HEAD
=======
// USER: create booking
export const createBooking = asyncHandler(async (req, res) => {
  const { roomId, checkIn, checkOut, totalPrice } = req.body;

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
>>>>>>> 24ad1938caec98c3a77ed78e2edb4c8800391ff4
export const updateBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    res.status(404);
    throw new Error('Booking not found');
  }

<<<<<<< HEAD
  if (req.body.status && !['confirmed'].includes(req.body.status)) {
=======
  // Acceptăm doar status valid
  if (req.body.status && !['pending', 'confirmed'].includes(req.body.status)) {
>>>>>>> 24ad1938caec98c3a77ed78e2edb4c8800391ff4
    res.status(400);
    throw new Error('Invalid status value');
  }

  booking.status = req.body.status ?? booking.status;
  booking.checkIn = req.body.checkIn ?? booking.checkIn;
  booking.checkOut = req.body.checkOut ?? booking.checkOut;

  const updatedBooking = await booking.save();
  res.json(updatedBooking);
});

<<<<<<< HEAD
=======
// ADMIN: delete booking
>>>>>>> 24ad1938caec98c3a77ed78e2edb4c8800391ff4
export const deleteBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    res.status(404);
    throw new Error('Booking not found');
  }

  await booking.deleteOne();
  res.json({ message: 'Booking removed' });
});
