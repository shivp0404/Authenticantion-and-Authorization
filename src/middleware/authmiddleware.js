const SessionRepositories = require("../model/auth/session.repositories");
const {VerifyUser} = require("../utils/jwt")


const authMiddleware = (req,res,next)=>{
    try{
           const token = req.cookies.AccessToken;
           
        if(!token){
           throw new Error("Token not found")
        }
        
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