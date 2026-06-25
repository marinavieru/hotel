import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

<<<<<<< HEAD
=======
// @desc Auth user & get token 
// @route POST /api/users/login
// @access Public
>>>>>>> 24ad1938caec98c3a77ed78e2edb4c8800391ff4

const authUser = asyncHandler(async (req, res) => { 
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id);

        res.status(200).json ({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

<<<<<<< HEAD
=======
// @desc Register user 
// @route POST /api/users
// @access Public
>>>>>>> 24ad1938caec98c3a77ed78e2edb4c8800391ff4

const registerUser = asyncHandler(async (req, res) => { 
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

<<<<<<< HEAD
    if(userExists) { 
=======
    if(userExists) { //if the user exists, we throw an error
>>>>>>> 24ad1938caec98c3a77ed78e2edb4c8800391ff4
        res.status(400);
        throw new Error('User already exists');
    }

<<<<<<< HEAD
    const user = await User.create ({  
=======
    const user = await User.create ({  //if the user does not exixt, we rgister a new user
>>>>>>> 24ad1938caec98c3a77ed78e2edb4c8800391ff4
        name, 
        email, 
        password,
    });

    if (user) {
        generateToken(res, user._id);

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

<<<<<<< HEAD
=======
// @desc Logout user / clear cookie
// @route POST /api/users/logout
// @access Private

>>>>>>> 24ad1938caec98c3a77ed78e2edb4c8800391ff4
const logoutUser = asyncHandler(async (req, res) => { 
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    });

    res.status(200).json({ message: 'Logged out successfully' });
});

<<<<<<< HEAD
=======
// @desc Get user profile
// @route GET /api/users/profile
// @access Private

>>>>>>> 24ad1938caec98c3a77ed78e2edb4c8800391ff4
const getUserProfile = asyncHandler(async (req, res) => { 
    const user = await User.findById(req.user._id);

    if (user) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

<<<<<<< HEAD
=======
// @desc Update user profile
// @route PUT /api/users/profile
// @access Private

>>>>>>> 24ad1938caec98c3a77ed78e2edb4c8800391ff4
const updateUserProfile = asyncHandler(async (req, res) => { 
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

<<<<<<< HEAD
=======
// @desc Get users profile
// @route GET /api/users
// @access Private/Admin

>>>>>>> 24ad1938caec98c3a77ed78e2edb4c8800391ff4
const getUsers = asyncHandler(async (req, res) => { 
    const users = await User.find({});
    res.status(200).json(users);
});

<<<<<<< HEAD
=======
// @desc Get user by ID
// @route GET /api/users/:id
// @access Private/Admin

>>>>>>> 24ad1938caec98c3a77ed78e2edb4c8800391ff4
const getUserByID = asyncHandler(async (req, res) => { 
    const user = await User.findById(req.params.id).select('-password');

    if (user) {
        res.status(200).json(user);
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

<<<<<<< HEAD
=======
// @desc DELETE user
// @route DELETE /api/users/:id
// @access Private/Admin

>>>>>>> 24ad1938caec98c3a77ed78e2edb4c8800391ff4
const deleteUser = asyncHandler(async (req, res) => { 
    const user = await User.findById(req.params.id);

    if(user) {
        if (user.isAdmin) {
<<<<<<< HEAD
            res.status(400); 
=======
            res.status(400); //400 client error
>>>>>>> 24ad1938caec98c3a77ed78e2edb4c8800391ff4
            throw new Error('Cannot delete admin user');
        } 
        await User.deleteOne({_id: user._id})
        res.status(200).json({message: 'User deleted successfully'});
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

<<<<<<< HEAD
=======
// @desc Update user 
// @route PUT /api/users/:id
// @access Private/Admin
>>>>>>> 24ad1938caec98c3a77ed78e2edb4c8800391ff4
const updateUser = asyncHandler(async (req, res) => { 
    const user = await User.findById(req.params.id);

    if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = Boolean(req.body.isAdmin);

    const updatedUser = await user.save();

    res.status(200).json({
        _id: updateUser._id,
        name: updateUser.name,
        email: updateUser.email,
        isAdmin: updateUser.isAdmin,
    }); 
} else {
    res.status(404);
    throw new Error('User not found');
}
});

export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserByID,
    updateUser,
};