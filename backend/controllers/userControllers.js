import UserModel from "../models/userModel.js"
import validator from "validator"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"




const loginUser=async(req,res)=>{
    try{
        const {email,password}=req.body;
        if(!email || !password){
            return res.json({success:false,message:"Fill the full information"})
        }
        const exist=await UserModel.findOne({email})
        if( !exist ){
            return res.json({success:false,message:"User is not exist "})
        }

        const match=await bcrypt.compare(password,exist.password);
        if(!match){
            return res.json({success:false,message:"Enter a correct password"})
        }
        const token = jwt.sign({ id: exist._id }, process.env.JWT_SECRET);
        res.json({success:true,token})    
    }
    catch(error){
        res.json({success:false,message:error.message})
    }
   
}

const registerUser=async(req,res)=>{
    try{
        const {name,email,password}=req.body

        if(!name ||!email ||!password){
            return res.json({success:false,message:"Fill the full information"})
        }
        
        const exist=await UserModel.findOne({email})
        if(exist){
           return res.json({success:false,message:"User already exist "})
        }
        if(!validator.isEmail(email)){
           return res.json({success:false,message:"please enter vaild email"})
        }
        if(password.length<8){
           return res.json({success:false,message:"please enter a strong password and atleast 8 letter"})
        }

        const salt=await bcrypt.genSalt(10);
        const hashedpassword=await bcrypt.hash(password,salt)

        const newUser = new UserModel({
            name,
            email,
            password: hashedpassword
        });
        const user=await newUser.save();
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.json({success:true,token})

    }
    catch(error){
        res.json({success:false,message:error.message})
    }

}

//api for admin login
const adminLogin=async(req,res)=>{
    try{
            const {email,password}=req.body
        if(email===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD){
            const token =jwt.sign(email+password,process.env.JWT_SECRET)
            res.json({success:true,token})
        } 
        else{

            res.json({success:false ,message:"enter corected email or password"})
        }
    }
    
    catch(error){
        res.json({success:false,message:error.message})
    }
}

export {loginUser,registerUser,adminLogin}