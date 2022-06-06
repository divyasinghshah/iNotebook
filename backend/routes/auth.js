const express=require('express');
const router=express.Router();
const User=require('../models/User');
const { body, validationResult } = require('express-validator');

//create a user using post '/auth
router.post('/',[
    body('email', 'enter valid email').isEmail(),
    body('password','password length should be atleast 5').isLength({ min: 5 })
],(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    User.create({
        name: req.body.name,
        password: req.body.password,
        email:req.body.email
      }).then(user => res.json(user))
      .catch(err=>{console.log(err)});
    
})

module.exports=router;