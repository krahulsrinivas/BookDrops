const router = require('express').Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');



router.post('/login', async (req, res) => {
    await User.findOne({ UserName: req.body.username }).then(async (usr) => {
        const check =await bcrypt.compare(req.body.password,usr.password);
        if (check){
            const token=jwt.sign({_id:usr._id},process.env.SECRET);
            res.send({"token":token,"username":usr.UserName});
        }else{
            res.send("Incorrect Password");
        }
    }).catch((err) => { res.status(404).send(`User Not Found ${err}`) });
});

router.post('/register',async (req, res) => {
    console.log(req.body.email);
    const user = new User();
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password1, salt);
    user.UserName = req.body.username;
    user.Email = req.body.email;
    user.password = hashedPassword;
    await user.save().then((usr) =>{
        const token=jwt.sign({_id:usr._id},process.env.SECRET);
        res.send({"token":token,"username":usr.UserName});
    }).catch(err => console.log(err));
});

module.exports = router;

