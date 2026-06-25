import asyncHandler from '../middleware/asyncHandler.js';
import Room from '../models/roomModel.js';
import Booking from '../models/bookingModel.js';

const getRooms = asyncHandler(async (req, res) => {
  const pageSize = 4;
  const page = Number(req.query.pageNumber) || 1;
  const count = await Room.countDocuments();

  const rooms = await Room.find({})
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ rooms, page, pages: Math.ceil(count / pageSize) });
});

const getRoomById = asyncHandler(async (req, res) => {
  const room = await Room.findById(req.params.id);

  if (room) {
    res.json(room);
  } else {
    res.status(404);
    throw new Error('Room not found');
  }
});

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
  getAvailableRooms,
};
