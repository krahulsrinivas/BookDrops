const jwt =require('jsonwebtoken');

function auth(req,res,next){
    const token=req.header('auth-token');
    if (!token){
        res.send("Session Timeout");
    }else{
        try{
        const verified=jwt.verify(token,process.env.SECRET);
        req.user=verified;
        next();
        }catch (err){
            res.status(400).send('Invalid Token');
        }

    }
}

module.exports=auth;