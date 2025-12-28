const UserRepositories = require("./user.repositories");
const {hashPassword,hashRefreshToken,comparePassword,compareRefreshToken} = require("../../utils/bcrypt");
const {GenerateAccessToken, GenerateRefreshToken,} = require("../../utils/jwt");

const AuthServices = {
  registration: async (payload) => {
    if (!payload.name) {
      throw new Error("Name is not defined");
    } else if (!payload.email) {
      throw new Error("Email is not defined");
    } else if (!payload.password) {
      throw new Error("Password is not defined");
    }
    const exist = await UserRepositories.findbyEmail(payload.email);
    if (exist) {
      throw new Error("Email is already existed");
    }

    const password = await hashPassword(payload.password);
    payload.password = password;
    const user = await UserRepositories.createUser(payload);
    return user;
  },

  login: async (payload) => {
    if (!payload.email) {
      throw new Error("Email is required");
    }
    if (!payload.password) {
      throw new Error("Password is required");
    }
    const user = await UserRepositories.findbyEmail(payload.email);
  
  
    if (!user) {
      throw new Error("Email is wrong");
    }

    const isMatched = await comparePassword(payload.password, user.password);

    if (!isMatched) {
      throw new Error("Password is wrong");
    }

    const accessToken = GenerateAccessToken({
      id: user._id,
      name: user.name,
    });

    if(!accessToken) throw new Error("Access token is not generated")

    const refreshToken = GenerateRefreshToken({
      id: user._id,
      name: user.name,
    });

    if(!refreshToken) throw new Error("Refresh token is not generated")
    

    const hashedRefreshToken = await hashRefreshToken(refreshToken);

    const usernew = await UserRepositories.saveRefreshToken(user,hashedRefreshToken);
    

    return{
      data:{
        name:user.name,
        email:user.email
      },
      accessToken,
      refreshToken
    } ;
  },
};

module.exports = AuthServices;
