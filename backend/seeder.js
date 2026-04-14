import mongoose from 'mongoose';
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
        await Product.deleteMany();
        await User .deleteMany();

        const createdUsers = await User.insertMany(users);

        const adminUser = createdUsers[0]._id;

        const sampleProducts = products.map((product) => {
            return { ...product, user: adminUser }; //... spread operator to add all the product data
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