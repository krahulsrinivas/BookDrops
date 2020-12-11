const router=require('express').Router();
const verify=require('../verify');
const User = require('../models/user');

router.get('/',async(req,res)=>{
    await User.findOne({ UserName: req.query.name }).then(async (usr) => {
        console.log(usr)
        res.send(usr);
    });
});

module.exports=router;