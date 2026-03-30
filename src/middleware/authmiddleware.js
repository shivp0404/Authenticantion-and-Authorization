const SessionRepositories = require("../model/auth/session.repositories");
const {VerifyUser} = require("../utils/jwt")


const authMiddleware = (req,res,next)=>{
    try{
        const authHeader = req.headers.authorization;
        

        if(!authHeader || !authHeader.startsWith("Bearer")){
           return res.status(401).json({message:"Token not found"})
        }
        
        const token = authHeader.split(" ")[1]
        

        const decoded = VerifyUser(token)

        const session = SessionRepositories.getSession(decoded.session_id)
        if(!session || session. is_revoked) throw new Error("Session is revoked")
       
        req.user = {
            id : decoded.id,
            session_id: decoded.session_id,
            role : decoded.role
        }
        next()
    }
    catch(err){
        next(err)
    }

}

module.exports = authMiddleware