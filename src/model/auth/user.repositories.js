const UserModel = require('./user.schema')

const UserRepositories = {
    createUser: (data)=>{
return UserModel.create(data);
    },

    findbyEmail: (payloademail)=>{
        return UserModel.findOne({email:payloademail}) 
    }
}

module.exports = UserRepositories