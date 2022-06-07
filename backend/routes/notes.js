const express=require('express');
const router=express.Router();
const fetchUser=require('../middleware/fetchUser');
const Notes=require('../models/Notes');

router.get('/fetchallnotes',fetchUser ,async(req,res)=>{
    try{
        let notes=await Notes.find({user:req.user.id});
    return res.json(notes);

    }
    catch(err){
        console.error(err.message);
        res.status(500).send("Some error occured");

    }
    
})

module.exports=router;