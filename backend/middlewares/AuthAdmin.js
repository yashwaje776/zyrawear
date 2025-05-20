import jwt from "jsonwebtoken"

const authadmin=(req,res,next)=>{
    try{
        const {token}=req.headers
        if(!token){
            return res.json({success:false,message:"Not athoried admin"})
        }
        const decode_token=jwt.verify(token,process.env.JWT_SECRET)
        if(process.env.ADMIN_EMAIL+process.env.ADMIN_PASSWORD !==decode_token){
           return res.json({success:true,message:"Not athoried admin"})
        }
        next()
    }
    catch(error){
        res.json({success:false,error})
    }
}

export default authadmin