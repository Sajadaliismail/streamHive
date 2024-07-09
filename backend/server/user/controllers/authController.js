const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const UserSchema = require('../../database/models/userModel');

const loginPost = async (req,res)=>{
    try {
        const {email , password } = req.body
       
        const user =await UserSchema.findOne({email});
        // console.log(user);
        if(!user){
            return res.status(400).json({ error: 'User is not registered'})
        }
        const match = await bcrypt.compare(password,user.password)
        if (!match) {
            return res.status(400).json({error: 'Invalid password' });
        }

        const token = jwt.sign({ userId: user._id }, 'abcdefgh', {
            expiresIn: "1d",
          });

        return res.status(200).json({user,token});
    } catch (error) {
        console.log(error.code);
        if(error.code===11000){
        return res.status(400).json({ error: 'User Exists' })
    }
    return res.status(400).json({error:'Internal error'})
    }
}

const checkEmail = async (req,res)=>{
    try {
        const {email} = req.body
        console.log(email);
        const user = await UserSchema.findOne({email})
        if(!user){
             return res.status(201).json({userExists:false})
        }
        return res.status(200).json({userExists:true})
    } catch (error) {
        return res.status(400).json({error:'Some internal error occured'})
    }
}

const signup = async (req,res)=>{
    try {
        const {name,email,password} = req.body
         const hashPassword = await bcrypt.hash(password, 10);
        const user = new UserSchema({
            name,
            email,
            password:hashPassword
        })
        await user.save()
        return res.status(200).json({success:true})
    } catch (error) {
        if(error.code===11000){
            return res.status(401).json({error:'User already exists'})
        }
    }
}
const logout = (req,res)=>{
    res.status(200).json({message:'Logout success'})
}

module.exports = {loginPost,logout,checkEmail,signup}