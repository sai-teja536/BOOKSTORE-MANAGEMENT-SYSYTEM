const express=require('express')
const router=express.Router()
const User=require("../models/User")
const {body,validationResult}=require('express-validator');
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const jwtSecret="imvelusaitejafromvit";

router.post("/createuser",[body('email','Should be in email format').isEmail(),body('password','Incorrect Password').isLength({min:6})],async (req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty())
    {
       return res.status(400).json({errors:errors.array()});
    }

  const salt=await bcrypt.genSalt(9);
  let securePassword=await bcrypt.hash(req.body.password,salt)

  try{
       await User.create({
        name:req.body.name,
        email:req.body.email,
        phoneNo:req.body.phoneNo,
        password:securePassword, 
        rePassword:req.body.rePassword
   
      })
      res.json({success:true});
     }catch(err){
         console.log(err);
         res.json({success:false});
     }

})


router.post("/loginuser",[body('email','Should be in email format').isEmail(),body('password','Incorrect Password').isLength({min:6})],async (req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty())
    {
       return res.status(400).json({errors:errors.array()});
    }
  

  let email=req.body.email;
  try{
     let userData=await User.findOne({email});
     if(!userData)
     {
       return res.status(400).json({errors:"Try logging with valid credentials"})
     } 

     const passwordCompare=await bcrypt.compare(req.body.password,userData.password)
     if(!passwordCompare)
     {
       return res.status(400).json({errors:"Try logging with valid credentials"})
     } 

     const data={
        user:{
           id:userData.id   
         }
     }
     const authToken=jwt.sign(data,jwtSecret);


     return res.json({success:true,authToken})
     }catch(err){
         console.log(err);
         res.json({success:false});
     }

})

module.exports=router;