const express=require('express');
const router=express.Router();
const User=require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

//create a user using post '/api/auth/createuser
router.post('/createUser',[
    body('email', 'enter valid email').isEmail(),
    body('password','password length should be atleast 5').isLength({ min: 5 })
],async (req,res)=>{

    try{

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        }
        let user=await User.findOne({email:req.body.email});
        if(user){
            return res.status(400).json({error:"Sorry a user with this email already exists"});
        }
        const salt=await bcrypt.genSalt(10);

        const secPass=await bcrypt.hash(req.body.password,salt);   
        user=await User.create({
            name: req.body.name,
            password:secPass,
            email:req.body.email
        });
        res.json(user);

    }
    catch(err){
        console.error(err.message);
        res.status(500).send("Some error occured");
    }
    
    
})

module.exports=router;