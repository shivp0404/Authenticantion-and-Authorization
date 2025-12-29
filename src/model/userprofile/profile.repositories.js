const user = require('../auth/user.schema')

const UserRepositories = {
  findbyId:async(id)=>{
    
    return user.findById(id).select("-password -refreshToken")
  }
}

module.exports = UserRepositories