const {VerifyUser} = require("../utils/jwt")


const authMiddleware = (req,res,next)=>{
    try{
        const authHeader = req.headers.authorization;
        

        if(!authHeader || !authHeader.startsWith("Bearer")){
           return res.status(401).json({message:"Token not found"})
        }
        
        const token = authHeader.split(" ")[1]
        

        const decoded = VerifyUser(token)
       
        req.user = {
            id : decoded.id,
            role : decoded.role
        }
        next()
    }
    catch(err){
        next(err)
    }

}

module.exports = authMiddleware