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

});

//Router3:update notes: login requried

router.put('/updatenote/:id',[
    body('title', 'enter valid title').isLength({min:5}),
    body('description','description length should be atleast 5').isLength({ min: 5 }),
    body('tag','tag length should be atleast 5').isLength({ min: 5 })
],fetchUser, async(req,res)=>{
    const {title,description,tag}=req.body;
    try{
        const newNote={
            title:title,
            description:description,
            tag:tag
        }
        let note= await Notes.findById(req.params.id);
        if(!note){
            return res.status(404).send("Not found");
        }
        if(note.user.toString()!==req.user.id){
            return res.status(401).send("Not Allowed");
        }

        note=await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true});
        return res.send(note);


    }catch(err){
        console.error(err.message);
        res.status(500).send("Some error occured");

    }

});


//Router4:delete notes: login requried

router.delete('/deletenote/:id',fetchUser, async(req,res)=>{
   
    try{
       
        let note= await Notes.findById(req.params.id);
        if(!note){
            return res.status(404).send("Not found");
        }
        if(note.user.toString()!==req.user.id){
            return res.status(401).send("Not Allowed");
        }

        note=await Notes.findByIdAndDelete(req.params.id);
        return res.send("Deleted successfully");


    }catch(err){
        console.error(err.message);
        res.status(500).send("Some error occured");

    }

});



module.exports=router;