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
    saveResetPasswordToken: (user,data)=>{
        user.resetPasswordToken = data.hashedResetToken;
        user.resetPasswordExpiresAt = data.expires
        return user.save()
    },
    findbyid:(id)=>{
        return UserModel.findById(id)
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