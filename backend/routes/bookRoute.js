const router = require('express').Router();
const mongoose = require('mongoose');
const Book = require('../models/book');
const verify=require('../verify');


router.post('/postBook', async (req, res) => {
    const book = new Book();
    book.title = req.body.title;
    book.description = req.body.description;
    book.genre = req.body.genre;
    book.imageUrl = req.body.imageUrl;
    book.author = req.body.author;
    book.content=req.body.content;
    book.status=req.body.status;
    await book.save().then((usr) =>{
        res.status(200).send(usr);
    }).catch(err => console.log(err));
});

router.post('/publish',async (req, res) => {
    await Book.findOneAndUpdate({_id:req.body.id}, {status:"published",content:req.body.content},{
        new: true
      }).then((usr)=>{
        res.send(usr);
    })
});

router.post('/draft',async (req, res) => {
    await Book.findOneAndUpdate({_id:req.body.id}, {status:"draft",content:req.body.content},{
        new: true
      }).then((usr)=>{
        res.send(usr);
    })
});

router.get('/getBooks',async (req, res) => {
    await Book.find({author:req.query.by,status:req.query.status}).then((books)=>{
        res.send(books);
    })
});

module.exports = router;