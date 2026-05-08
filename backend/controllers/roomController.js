import asyncHandler from '../middleware/asyncHandler.js';
import Room from '../models/roomModel.js';
import Booking from '../models/bookingModel.js';

// @desc Fetch all rooms
// @route GET /api/rooms
// @access Public
const getRooms = asyncHandler(async (req, res) => {
  const pageSize = 4;
  const page = Number(req.query.pageNumber) || 1;
  const count = await Room.countDocuments();

  const rooms = await Room.find({})
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ rooms, page, pages: Math.ceil(count / pageSize) });
});

// @desc Fetch single room
// @route GET /api/rooms/:id
// @access Public
const getRoomById = asyncHandler(async (req, res) => {
  const room = await Room.findById(req.params.id);

  if (room) {
    res.json(room);
  } else {
    res.status(404);
    throw new Error('Room not found');
  }
});

// @desc Create a room
// @route POST /api/rooms
// @access Private/Admin
const createRoom = asyncHandler(async (req, res) => {
  const room = new Room({
    name: 'Sample Room',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    roomType: 'standard',
    availableRooms: 0,
    numReviews: 0,
    description: 'Sample description',
  });

  const createdRoom = await room.save();
  res.status(201).json(createdRoom);
});

// @desc Update a room
// @route PUT /api/rooms/:id
// @access Private/Admin
const updateRoom = asyncHandler(async (req, res) => {
  const { name, price, description, image, roomType, availableRooms } = req.body;

  const room = await Room.findById(req.params.id);

  if (room) {
    room.name = name || room.name;
    room.price = price || room.price;
    room.description = description || room.description;
    room.image = image || room.image;
    room.roomType = roomType || room.roomType;
    room.availableRooms = availableRooms || room.availableRooms;

    const updatedRoom = await room.save();
    res.json(updatedRoom);
  } else {
    res.status(404);
    throw new Error('Room not found');
  }
});

// @desc Delete a room
// @route DELETE /api/rooms/:id
// @access Private/Admin
const deleteRoom = asyncHandler(async (req, res) => {
  const room = await Room.findById(req.params.id);

  if (room) {
    await Room.deleteOne({ _id: room._id });
    res.json({ message: 'Room deleted' });
  } else {
    res.status(404);
    throw new Error('Room not found');
  }
});

// @desc Create a room review
// @route POST /api/rooms/:id/reviews
// @access Private
const createRoomReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const room = await Room.findById(req.params.id);

  if (room) {
    const alreadyReviewed = room.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error('Room already reviewed');
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    room.reviews.push(review);
    room.numReviews = room.reviews.length;

    room.rating =
      room.reviews.reduce((acc, review) => acc + review.rating, 0) /
      room.reviews.length;

    await room.save();
    res.status(201).json({ message: 'Review added' });
  } else {
    res.status(404);
    throw new Error('Room not found');
  }
});

// @desc Get available rooms
// @route GET /api/rooms/available
// @access Public
const getAvailableRooms = asyncHandler(async (req, res) => {
  const { checkIn, checkOut, type } = req.query;

  if (!checkIn || !checkOut) {
    res.status(400);
    throw new Error('Missing check-in or check-out date');
  }

  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);

  if (isNaN(checkInDate) || isNaN(checkOutDate)) {
    res.status(400);
    throw new Error('Invalid date format');
  }

  if (checkOutDate <= checkInDate) {
    res.status(400);
    throw new Error('Check-out date must be after check-in date');
  }

  const overlappingBookings = await Booking.find({
    checkIn: { $lt: checkOutDate },
    checkOut: { $gt: checkInDate },
  }).select('room');

  const bookedRoomIds = overlappingBookings
    .filter((b) => b.room)
    .map((b) => b.room.toString());

  const query = {
    _id: { $nin: bookedRoomIds },
  };

  if (type) {
    query.roomType = type;
  }

  const availableRooms = await Room.find(query);

  res.json(availableRooms);
});

export {
  getRooms,
  getRoomById,
  createRoom,
  updateRoom,
  deleteRoom,
  createRoomReview,
  getAvailableRooms,
};
