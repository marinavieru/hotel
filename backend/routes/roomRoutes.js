import express from 'express';
const router = express.Router();
import { 
    getRooms,
    getRoomById,
    createRoom,
    updateRoom,
    deleteRoom,
    createRoomReview,
    getAvailableRooms
} from '../controllers/roomController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

// IMPORTANT: /available trebuie să fie înainte de /:id
router.get('/available', getAvailableRooms);

router.route('/')
  .get(getRooms)
  .post(protect, admin, createRoom);

router.route('/:id')
  .get(getRoomById)
  .put(protect, admin, updateRoom)
  .delete(protect, admin, deleteRoom);

router.route('/:id/reviews')
  .post(protect, createRoomReview);

export default router;
