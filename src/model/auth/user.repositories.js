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
    },

    findRefreshtoken:async(id)=>{
        const user = await UserModel.findById(id).select('refreshToken')
        return user
    },

    removeRefreshToken:async(id)=>{
        const user = await UserModel.findByIdAndUpdate(id)
        user.refreshToken = "";
        return user.save();
        

    },

    

}

module.exports = UserRepositories