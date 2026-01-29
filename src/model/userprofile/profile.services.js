const profileRepositories = require("../userprofile/profile.repositories");
const AuthRepositoreis= require("../auth/user.repositories")
const bcrypt = require('../../utils/bcrypt')
const profileServices = {
  userprofile: async (id) => {
    const user = await profileRepositories.findbyId(id);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  },

  alluser: async () => {
    const users = await profileRepositories.alluser();

    if (!users) {
      throw new Error("User not found");
    }

    return users;
  },

  updatePassword:async(id,data)=>{
  const user = await AuthRepositoreis.findbyid(id);
  console.log(data)
  if(!user) throw new Error("user is not defined")
  const isValid = await bcrypt.comparePassword(data.oldpassword,user.password)
 if(!isValid) throw new Error("Old password doesn't match");
 const hashedNewPassword = await bcrypt.hashPassword(data.newpassword)
 if(!hashedNewPassword) throw new Error("New Password not hashed")
  await AuthRepositoreis.updatePassword(user,hashedNewPassword);
  console.log(user)
  return{
    message:"Password updated successfully"
  }

  }
};

module.exports = profileServices;
