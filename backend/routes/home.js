const router=require('express').Router();
const verify=require('../verify');
router.get('/',verify,async(req,res)=>{

    res.send('Hello');
});

module.exports=router;