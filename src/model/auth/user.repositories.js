const UserModel = require('./user.schema')

const UserRepositories = {
    createUser: (data)=>{
return UserModel.create(data);
    },

    findbyEmail: (payloademail)=>{
        return UserModel.findOne({email:payloademail}) 
    },
    
    saveRefreshToken: (user,refreshtoken)=>{
        
        user.refreshToken = refreshtoken;
        return user.save()
    }

    

}

module.exports = UserRepositories