import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String, 
        required: true, 
    }, 
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    },
}, {
    timestamps: true,
});

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

<<<<<<< HEAD
userSchema.pre('save', async function (next) { 
=======
userSchema.pre('save', async function (next) { //pre allows us to do something before getting saved in the database
>>>>>>> 24ad1938caec98c3a77ed78e2edb4c8800391ff4
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
}); 
const User = mongoose.model("User", userSchema);

export default User;