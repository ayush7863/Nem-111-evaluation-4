const jwt=require("jsonwebtoken")

const Authentication=(req,res,next)=>{
    const token=req.headers.authorization
    if(token){
        let decoded = jwt.verify(token, 'masai');        
        if(decoded.userId){
            req.body.userId=decoded.userId
            next()
        }else{
            res.status(400).send({"err":"Please Login First!"})
        }
        

    }else{
         res.status(400).send({"err":"Please Login First!"})
    }

}
module.exports={
    Authentication
}