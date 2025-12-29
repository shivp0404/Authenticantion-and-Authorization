const {VerifyUser} = require("../utils/jwt")
const jwt = require("jsonwebtoken")

const authMiddleware = (req,res,next)=>{
    try{
        const authHeader = req.headers.authorization;
        

        if(!authHeader || !authHeader.startsWith("Bearer")){
            res.status(401).json({message:"Token not found"})
        }
        
        const token = authHeader.split(" ")[1]
        

        const decoded = VerifyUser(token)

       

        req.user = {
            id : decoded.id,
            email : decoded.name
        }
        next()
    }
    catch(err){
        next(err)
    }

}

module.exports = authMiddleware