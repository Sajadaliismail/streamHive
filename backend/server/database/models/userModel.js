const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{type:String},
    email:{type:String , required: true , unique :true},
    password:{type:String , required :true},
    image:{type:String}
})

const UserSchema = mongoose.model('user',userSchema)
module.exports = UserSchema