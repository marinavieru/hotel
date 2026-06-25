import express from 'express';
const router = express.Router();
import { 
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserByID,
    updateUser,
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';


<<<<<<< HEAD
router.route('/').post(registerUser).get(protect, admin, getUsers); 
=======
router.route('/').post(registerUser).get(protect, admin, getUsers); // protect = to be logged in; in this case it is not enough to be logged in, but also need to be an admin to get users. 
>>>>>>> 24ad1938caec98c3a77ed78e2edb4c8800391ff4
router.post('/logout', logoutUser);
router.post('/auth', authUser);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);
router.route('/:id').delete(protect, admin, deleteUser).get(protect, admin, getUserByID).put(protect, admin, updateUser);

export default router;