const express = require("express");
const bcrypt = require('bcryptjs')
const User = require('../models/User');
const Authenticate = require("../middleware/Authenticate");


const router = express.Router()


router.post('/register',async (req,res)=>{
    if(!req.body.email || !req.body.password || !req.body.name){
        return res.status(200).send({success:false,message:'please fill the data'})
    }
    try{
        const userexist = await User.findOne({email:req.body.email})
        if(userexist){
            return res.status(200).send({success:false,message:"email already exist"})
        } 
        const password = req.body.password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)
        req.body.password = hashedPassword
        const user = new User(req.body)
        await user.save()
        return res.status(200).send({success:true, message:"successfully registered"})

    }catch(err){
        res.status(200).send({success:false,message:'error in registeration form'})
    }
  
})

router.post('/login',async (req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
        return res.status(200).send({success:false,message:'please fill the data'})
    }
    try{
        const response = await User.findOne({email:email})
        if(!response){
            return res.status(200).send({success:false,message:'email does not exist'})
        }
        const passwordcheck = await bcrypt.compare(password,response.password)
        if(passwordcheck){
            token  = await response.generateAuthToken()
            res.cookie("JWtoken",token,{
                expires: new Date(Date.now() + 25892000000),
                httpOnly:true
            }) 
            return res.status(200).send({success:true, message:"successfully login",token})
        }
        return res.status(200).send({success:false, message:"invalid username or password"})
    }catch(err){
        res.status(200).send({success:false,message:'error in login page'})
    }
})

router.post('/getUserData',Authenticate, async (req,res)=>{
    try{
        const user = await User.findOne({_id:req.body.userId})
        if(!user){
            return res.status(400).send({success:false,message:'user not found'})
        }
        else{
            res.status(200).send({success:true,message:"successfully fetched user data",data:user
            })
        }
    }catch(err){
        console.log(err)
    }
})

router.post('/updateuserdetails',Authenticate, async (req,res)=>{
    try{
        const user = await User.findOneAndUpdate({_id:req.body.userId},req.body.updateddata)
        res.status(200).send({
            success:true,
            message:'user details updated',
        })
    }catch(err){
        res.status(200).send({
            success:false,
            message:'error in updating',
        })
    }
})


router.get("/logout",(req,res)=>{
    res.clearCookie("JWtoken",path="/logout")
    res.status(200).send({success:true, message:"logout successful"})
})

module.exports = router