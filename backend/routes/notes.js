const express=require('express');
const router=express.Router();
const fetchUser=require('../middleware/fetchUser');
const Notes=require('../models/Notes');
const { body, validationResult } = require('express-validator');

//Router 1:: fetch all notes using get :login required.
router.get('/fetchallnotes',fetchUser ,async(req,res)=>{
    try{
        let notes=await Notes.find({user:req.user.id});
    return res.json(notes);

    }
    catch(err){
        console.error(err.message);
        res.status(500).send("Some error occured");

    }
    
});

// Router 2:: add new note using post:login required
router.post('/addnote',[
    body('title', 'enter valid title').isLength({min:5}),
    body('description','description length should be atleast 5').isLength({ min: 5 })

],fetchUser, async(req,res)=>{
    try{

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        }

        let notes=await Notes.create({
            title:req.body.title,
            description:req.body.description,
            tag:req.body.tag,
            user:req.user.id
        })

        return res.json({notes});


    }catch(err){
        console.error(err.message);
        res.status(500).send("Some error occured");

    }

})


module.exports=router;