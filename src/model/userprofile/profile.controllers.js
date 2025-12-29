const profileServices = require("../userprofile/profile.services")

const ProfileControllers = {
    getprofile: async(req,res,next)=>{
        try{
          const userprofile =  await profileServices.userprofile(req.user.id)
          res.status(200).json({success:true,message:"Get Profile data",data:{userprofile}})
        }
        catch(err){
            next(err)
        }
    }
}

module.exports = ProfileControllers;