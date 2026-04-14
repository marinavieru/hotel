import mongoose from 'mongoose'; 

const reviewSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, //has it's own type, it is an object
        required: true, 
        ref: "User", // which collectionis comming from (what is the reference)
    },
    name: {
        type: String,
        required: true,
    },
    rating: {
        type: Number, 
        required: true,
    },

    comment: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
})

const roomSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, //has it's own type, it is an object
        required: true, 
        ref: "User", // which collectionis comming from (what is the reference)
    },
    name: {
        type: String,
        required: true, 
    }, 
    image: {
        type: String,
        required: true,
    }, 
    description: {
        type: String, 
        required: true,
    },
    roomType: {
        type: String,
        required: true,
        enum: ["standard", "deluxe", "VIP"],
    },
    reviews: [reviewSchema], 
    rating: {
        type: Number,
        required: true,
        default: 0,
    },
    numReviews: {
        type: Number,
        required: true,
        default: 0,
    },
    price: {
        type: Number,
        required: true,
        default: 0,
    },
    availableRooms: {
        type: Number,
        required: true,
        default: 0,
    },
}, {
    timestamps: true,
});

const Room = mongoose.model("Room", roomSchema);

export default Room;