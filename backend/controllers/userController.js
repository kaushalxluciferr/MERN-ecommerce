// Route for User Registration
import validator from 'validator'
import userModel from "../models/user.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// generating token 

const createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}


const longinUser=async (req,res)=>{
    try{
const {email,password}=req.body;

const exemail=await userModel.findOne({email})
if(!exemail)
{
    return res.status(404).json({
        success:false,
        message:"Email not exits in the database"
    })
}
// checking whetehr the passwowrd is correct or not 
 const match=await bcrypt.compare(password,exemail.password)
 
 if(!match)
 {
    return res.status(404).json({
        success:false,
        message:"password is not matched"
    })
 }
 
 const token=createToken(exemail._id);
 return res.status(200).json({
    success:true,
    token
 })

    }catch(error)
    {
        return res.status(500).json({
            success:false,
            message:"cannot login ,someting is wrong"
        })
    }
}

const registerUser=async (req,res)=>{ 
try{
const {name,email,password}=req.body


//checking whether the email exists in db or not
const exemail=await userModel.findOne({email})
if(exemail)
{
    return res.status(404).json({
        success:false,
        message:"User Already Exists"
    })
}

//checking by npm validator that email is valid or not
if(!validator.isEmail(email))
{
    return res.status(500).json({
        success:false,
        message:"enter valid email"
    })
}
// checking by passowrd length
if(password.length<8)
{
return res.status(500).json({success:false,
    message:"Enter 8 letter of password"
})
}

// hashing the passowrd
const salt=await bcrypt.genSalt(10)
 const haspas= await bcrypt.hash(password,salt)

//  creating the useer

   const newuser=new userModel({
    name,
    email,
    password:haspas
 })
const user=await newuser.save()
// creating a json token to validate further whether the user is valid or not
const token=createToken(user._id)

 return res.status(200).json({
    success:true,
    token,
    user
 })

}catch(error)
{
 return res.status(500).json({
    success:false,
    message:"user not created any error occured"
 })
 
}
}

// Route for admin login
const adminLogin=async (req,res)=>{
try{
const {email,password}=req.body
if(email===process.env.ADMIN_EMAIL&&password===process.env.ADMIN_PASSWORD)
{
const token=jwt.sign(email+password,process.env.JWT_SECRET)
return res.status(200).json({
    success:true,
    token
})
}
else{
return res.status(404).json({
    success:false,
    message:"invalid email or passowrd"
})
}
}catch(error)
{
return res.status(500).json({
    success:false,
    message:error.message
})
}
}

export {longinUser,registerUser,adminLogin}