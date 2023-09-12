const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const connectToMongo = ()=>{
    mongoose.connect(MONGO_URI,()=>{
        console.log("Connected to Mongo Successfully");
    })
}

module.exports = connectToMongo;