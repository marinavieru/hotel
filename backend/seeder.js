import mongoose from 'mongoose';
<<<<<<< HEAD
import dotenv from 'dotenv'; 
import colors from 'colors';
import users from './data/users.js';
import products from './data/products.js';
import User from './models/userModel.js'; 
import Product from './models/productModel.js'; 
import Order from './models/orderModel.js';
import connectDB from './config/db.js'; 

dotenv.config(); 

connectDB(); 

const importData = async () => {
    try {
        await Order.deleteMany(); 
=======
import dotenv from 'dotenv'; //we need the Mongo URI
import colors from 'colors';
import users from './data/users.js';
import products from './data/products.js';
import User from './models/userModel.js'; //we are entering a user to the db
import Product from './models/productModel.js'; 
import Order from './models/orderModel.js'; //we can wipe everything including orders
import connectDB from './config/db.js'; //we want to connect to our db

dotenv.config(); //initialise the dotenv so we can use the variables

connectDB(); //we want to connect to our db

const importData = async () => { // create this function 
    try {
        await Order.deleteMany(); //deleteMany will delete multiple records
>>>>>>> 24ad1938caec98c3a77ed78e2edb4c8800391ff4
        await Product.deleteMany();
        await User .deleteMany();

        const createdUsers = await User.insertMany(users);

        const adminUser = createdUsers[0]._id;

        const sampleProducts = products.map((product) => {
<<<<<<< HEAD
            return { ...product, user: adminUser }; 
=======
            return { ...product, user: adminUser }; //... spread operator to add all the product data
>>>>>>> 24ad1938caec98c3a77ed78e2edb4c8800391ff4
        });

        await Product.insertMany(sampleProducts); 

        console.log('Data Imported!'.green.inverse);
        process.exit(); 
    } catch(error){
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
}

const destroyData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        console.log('Data Destroyed!'.red.inverse);
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData(); 
} else {
    importData();
}