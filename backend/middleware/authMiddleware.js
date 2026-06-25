import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler.js';
import User from '../models/userModel.js';

<<<<<<< HEAD
const protect = asyncHandler(async (req, res, next) => {
    let token;

=======
//Protect routes
const protect = asyncHandler(async (req, res, next) => {
    let token;

    //Read the JWT from the cookie
>>>>>>> 24ad1938caec98c3a77ed78e2edb4c8800391ff4
    token = req.cookies.jwt;

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.userId).select('-password');
            next();
        } catch (error) {
            console.log(error);
            res.status(401);
            throw new Error('Not authorized, token failed');
        }

    } else {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
});

<<<<<<< HEAD
=======
//Admin middleware
>>>>>>> 24ad1938caec98c3a77ed78e2edb4c8800391ff4
const admin = (req, res, next) => { 
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401);
        throw new Error('Not authorized as admin');
    }
};

export { protect, admin };