const profileRepositories = require("../userprofile/profile.repositories")

const profileServices = {
    userprofile:async(id)=>{
    
      const user =  await profileRepositories.findbyId(id)
      if(!user){
        throw new Error("User not found")
      }
      return user
    }
}

module.exports = profileServices;