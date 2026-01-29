const UserModel = require('./user.schema')

const UserRepositories = {
    createUser: async(data)=>{
return await UserModel.create(data);
    },

    findbyEmail: async(payloademail)=>{
        return await UserModel.findOne({email:payloademail}) 
    },
    updatePassword:async(user,newpassword)=>{
user.password = newpassword
     return await user.save()
    },
    
    saveRefreshToken: async (user,refreshtoken)=>{
        user.refreshToken = refreshtoken;
        return await user.save()
    },
    saveResetPasswordToken:async (user,data)=>{
        user.resetPasswordToken = data.resetPasswordToken;
        user.resetPasswordExpiresAt = data.resetPasswordExpiresAt
        return await user.save()
    },
    findbyid:async(id)=>{
        return await UserModel.findById(id)
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
    clearResetPasswordToken:async(user)=>{
        user.resetPasswordToken = null;
        user.resetPasswordExpiresAt = null
        return await user.save()
    },

    

}

module.exports = UserRepositories