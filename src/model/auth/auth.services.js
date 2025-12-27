const UserRepositories = require('./user.repositories')
const hashPassword = require('../../utils/bcrypt')

const AuthServices = {
 registration: async (payload)=>{
  if(!payload.name){
    throw new error ('Name is not defined')
  }
  else if(!payload.email){
    throw new error('Email is not defined')
  }
  else if(!payload.password){
    throw new error('Password is not defined')
  }
  const exist = await UserRepositories.findbyEmail(payload.email)
  if(exist){
    throw new error('Email is already existed')
  }

  const password = await hashPassword(payload.password)
  payload.password = password
  const user = (await UserRepositories.createUser(payload));
  return user
 }


}

module.exports = AuthServices