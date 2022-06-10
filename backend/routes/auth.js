const express=require('express');
const router=express.Router();
const User=require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fetchUser=require('../middleware/fetchUser');
//Route 1:create a user using post '/api/auth/createuser
router.post('/createUser',[
    body('email', 'enter valid email').isEmail(),
    body('password','password length should be atleast 5').isLength({ min: 5 })
],async (req,res)=>{
    let success=false;
    try{

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            success=false;
        return res.status(400).json({ success,errors: errors.array() });
        }
        let user=await User.findOne({email:req.body.email});
        if(user){
            success=false;
            return res.status(400).json({success,error:"Sorry a user with this email already exists"});
        }
        const salt=await bcrypt.genSalt(10);
        success=true;
        const secPass=await bcrypt.hash(req.body.password,salt);   
        user=await User.create({
            name: req.body.name,
            password:secPass,
            email:req.body.email
        });
        const data={
            user:{
                id:user.id
            }
        }
        const JWT_SECRERT="Divya";
        var token = jwt.sign(data, JWT_SECRERT);
        console.log(token);
        return res.json({success,token});

    }
    catch(err){
        console.error(err.message);
        res.status(500).send("Some error occured");
    }
    
    
});

//Route 2:login a user using post '/api/auth/login
router.post('/login',[
    body('email', 'enter valid email').isEmail(),
    body('password','password should not be empty').exists()
],async (req,res)=>{
    let success=false;
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        }
        const {email,password}=req.body;
        let user=await User.findOne({email});
        if(!user){
            success=false;
            return res.status(400).json({success,error:"Please try to login with correct credentials"});

        }
        const passwordCompare= await bcrypt.compare(password,user.password);
        if(!passwordCompare){
            success=false;
            return res.status(400).json({success,error:"Please try to login with correct credentials"}); 
        }
        
        const data={
            user:{
                id:user.id
            }
        }
        const JWT_SECRERT="Divya";
        var token = jwt.sign(data, JWT_SECRERT);
        // console.log(token);
        success=true;
        return res.json({success,token});




    }catch(err){
        console.error(err.message);
        res.status(500).json({err});
    }


});

// ROUTE 3: get user detais. Login required
router.post('/getuser',fetchUser,async (req,res)=>{

    try{
    let  userId=req.user.id;
    const user=await User.findById(userId).select("-password");
    return res.send(user);
    }
    catch(err){
        console.error(err.message);
        res.status(500).json({err});

    }
    

});





module.exports=router;