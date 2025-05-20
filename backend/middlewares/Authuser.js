import jwt from "jsonwebtoken"

const authuser=(req,res,next)=>{
    try{
        const {token}=req.headers
        
        if(!token){
           return res.json({success:false,message:"unauthried user"});
        }
        const decode_token=jwt.verify(token,process.env.JWT_SECRET);
        req.body.userId=decode_token.id;
        next();

    }
    catch(error){
        res.json({success:false,message:error.message})
    }

}

export default authuser