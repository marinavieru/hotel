import express from 'express';
const router = express.Router();
import { 
    getRooms,
    getRoomById,
    createRoom,
    updateRoom,
    deleteRoom,
    getAvailableRooms
} from '../controllers/roomController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.get('/available', getAvailableRooms);

router.route('/')
  .get(getRooms)
  .post(protect, admin, createRoom);

router.route('/:id')
  .get(getRoomById)
  .put(protect, admin, updateRoom)
  .delete(protect, admin, deleteRoom);

export default router;
