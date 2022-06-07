var jwt = require('jsonwebtoken');
const JWT_SECRERT="Divya";
const fetchuser=(req,res,next)=>{
    //get the user from the jwt token and append id to req object
    const token=req.header('auth-token');
    if(!token){
        return res.status(401).send({error:"Please authenticate using valid token"});

    }
    try{
        const data=jwt.verify(token,JWT_SECRERT);
         req.user=data.user;

    }catch(err){

        return res.status(401).send({error:"Please authenticate using valid token"});

    }
    



    next();
}

module.exports=fetchuser;