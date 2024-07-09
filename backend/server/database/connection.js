const mongoose = require('mongoose');
require('dotenv').config()
const URI = process.env.MONGOURI

const connectdb = async ()=>{
    try {
       await mongoose.connect(URI)
   console.log('Mongodb Connected Successfully');
    } catch (error) {
        
    }
}

module.exports = connectdb
