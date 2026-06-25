import express from 'express';
const router = express.Router();
import { 
    getRooms,
    getRoomById,
    createRoom,
    updateRoom,
    deleteRoom,
<<<<<<< HEAD
=======
    createRoomReview,
>>>>>>> 24ad1938caec98c3a77ed78e2edb4c8800391ff4
    getAvailableRooms
} from '../controllers/roomController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

<<<<<<< HEAD
=======
// IMPORTANT: /available trebuie să fie înainte de /:id
>>>>>>> 24ad1938caec98c3a77ed78e2edb4c8800391ff4
router.get('/available', getAvailableRooms);

router.route('/')
  .get(getRooms)
  .post(protect, admin, createRoom);

router.route('/:id')
  .get(getRoomById)
  .put(protect, admin, updateRoom)
  .delete(protect, admin, deleteRoom);

<<<<<<< HEAD
=======
router.route('/:id/reviews')
  .post(protect, createRoomReview);

>>>>>>> 24ad1938caec98c3a77ed78e2edb4c8800391ff4
export default router;
