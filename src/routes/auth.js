const express=require("express")
const authRouter=express.Router()
const {validateSignUpData}=require('../utils/validation')
const User = require('../models/user');
const bcrypt=require('bcrypt')
const jwt = require('jsonwebtoken');


authRouter.post("/signup", async (req, res) => {
  try {
    validateSignUpData(req);
    const { firstName, lastName, emailId, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    const savedUser = await user.save();

    
    const token = savedUser.getJWT();

    
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax", 
      secure: false,   
      maxAge: 7 * 24 * 60 * 60 * 1000 
    });

    res.status(201).json({
      message: "User added successfully!",
      data: savedUser,
    });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});


authRouter.post("/login",async (req,res)=>{
    try{
         
         const { emailId, password}=req.body;
         
         const user=await User.findOne({emailId:emailId})
         if(!user){
            throw new Error("Invalid EmailID")
         }
         const isPasswordValid=await bcrypt.compare(password,user.password)
         if(isPasswordValid){

            const token=await jwt.sign({_id:user._id}, "DEV@Tinder$790")
            //console.log(token)
            res.cookie("token", token)
            res.send(user)
         }
         else{
            throw new Error("Invalid Password")
         }
   
        

    }
    catch(err){
        res.status(400).send("ERROR:" + err.message);

    }

    
})

authRouter.post('/logout', async(req,res)=>{
    res.cookie("token", null,{
        expires:new Date(Date.now())

    })
    res.send("logout successful")
})

module.exports=authRouter