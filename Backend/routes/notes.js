const express = require('express');
const router = express.Router();
var fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');

//ROUTE 1: Get all notes using GET: /api/notes/fetchallnotes
router.get('/fetchallnotes',fetchuser,async (req,res)=>{
  try {
    const notes = await Notes.find({user: req.user.id});
    res.json(notes);   
  } catch(error){
    console.log(error.message);
    res.status(500).send("Internal Server error"); //500 => Internal Server error
  }
})

//ROUTE 2: Add a new note using POST: /api/notes/fetchallnotes

router.post('/addnote',fetchuser,[
    body('title','Enter a valid title').isLength({ min: 3 }),
    body('description','Description must be atleast 5 characters').isLength({ min: 5 })
],async (req,res)=>{
    try {
        
    
    const {title,description,tag} = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() }); //400=>bad network request
      } 
    const note = new Notes({
        title,description,tag,user: req.user.id
    })
    const savedNote = await note.save();
    res.json(note);
} catch(error){
    console.log(error.message);
    res.status(500).send("Internal Server error"); //500 => Internal Server error
  }
})

//ROUTE 3: Update an existing notes using PUT: /api/notes/updatenote. Login required.
router.put('/updatenote/:id',fetchuser,async (req,res)=>{

  try {
    const {title,description,tag} = req.body;
    // Create a newNote object
    const newNotes = {};
    if(title){newNotes.title = title};
    if(description){newNotes.description = description};
    if(tag){newNotes.tag = tag};

    //Find the note to be updated and update it
    let note = await Notes.findById(req.params.id);
    if(!note){return res.status(404).send("Not Found")}
    if(note.user.toString() !== req.user.id){
      return res.status(401).send("Not Allowed");
    }
    note = await Notes.findByIdAndUpdate(req.params.id,{$set: newNotes}, {new:true})
    res.json({note});
  } catch(error){
    console.log(error.message);
    res.status(500).send("Internal Server error"); //500 => Internal Server error
  }

})

//ROUTE 4:Delete an existing notes using DELETE: /api/notes/deletenote. Login required.
router.delete('/deletenote/:id',fetchuser,async (req,res)=>{

  try {
    //Find the note to be deleted and delete it
    let note = await Notes.findById(req.params.id);
    if(!note){return res.status(404).send("Not Found")}

    //Allow deletion if user owns this note 
    if(note.user.toString() !== req.user.id){
      return res.status(401).send("Not Allowed");
    }
    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({"Success":"Note is been deleted", note:note});
  } catch(error){
    console.log(error.message);
   res.status(500).send("Internal Server error"); //500 => Internal Server error
  }

})

module.exports = router;