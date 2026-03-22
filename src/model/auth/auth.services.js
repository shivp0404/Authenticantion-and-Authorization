const UserRepositories = require("./user.repositories");
const {
  hashPassword,
  hashRefreshToken,
  comparePassword,
  compareRefreshToken,
} = require("../../utils/bcrypt");
const {
  GenerateAccessToken,
  GenerateRefreshToken,
  decodeRefreshToken, GenerateResetPasswordToken,decodeResetPasswordToken
} = require("../../utils/jwt");


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
      role: user.role,
    });

    if (!accessToken) throw new Error("Access token is not generated");

    const refreshToken = GenerateRefreshToken({
      id: user._id,
      role: user.role,
    });

    if (!refreshToken) throw new Error("Refresh token is not generated");

    const hashedRefreshToken = await hashRefreshToken(refreshToken);

    const usernew = await UserRepositories.saveRefreshToken(
      user,
      hashedRefreshToken,
    );

    return {
      data: {
        name: user.name,
        email: user.email,
      },
      accessToken,
      refreshToken,
    };
  },

  logout: async (refreshToken) => {
    const decoded = decodeRefreshToken(refreshToken);

    const dbtoken = await UserRepositories.findRefreshtoken(decoded.id);
    if (!dbtoken) throw new Error("dbtoken not found");

    const isValid = compareRefreshToken(refreshToken, dbtoken.refreshToken);
    if (!isValid) throw new Error("invalid Refresh Token");

    const user = await UserRepositories.removeRefreshToken(decoded.id);

    return {
      message: "logout",
    };
  },
  refresh: async (refreshToken) => {
    if (!refreshToken) throw new Error("RefreshToken didn't receive");

    const decode = await decodeRefreshToken(refreshToken);
    if (!decode) throw new Error("Token didn't decode");
  

     const user = await UserRepositories.findbyid(decode.id)
    if (!user) throw new Error("User didn't found");
  

    const isValid = await compareRefreshToken(refreshToken,user.refreshToken);
    if (!isValid) throw new Error("Token is not Valid");


    const NewAccessToken = await GenerateAccessToken({
      id: decode.id,
      role: decode.role,
    });

  
    if (!NewAccessToken) throw new Error("New Access Token is not generated");

    const NewRefreshToken =  await GenerateRefreshToken({
      id: decode.id,
      role: decode.role,
    });
    
    if(!NewRefreshToken) throw new Error("New Refresh Token is not generated");

    const hashNewRefreshToken = await hashRefreshToken(NewRefreshToken)
    if(!hashNewRefreshToken) throw new Error("New Refresh Token is not hashed")

   
    await UserRepositories.saveRefreshToken(user,hashNewRefreshToken)
    
     
    return{
      AccessToken:NewAccessToken,
      RefreshToken:hashNewRefreshToken 
    }
  },
forgotPassword: async (email) => {
    if (!email) throw new Error("Email didn't receive");

    const user = await UserRepositories.findbyEmail(email);
    if (!user) throw new Error("User not found");

   
    const resetToken = await GenerateResetPasswordToken({
      id: user._id,
    });

    if (!resetToken) throw new Error("Reset token not generated");

  
    const hashedResetToken = await hashRefreshToken(resetToken);

    if (!hashedResetToken)
      throw new Error("Reset password token not hashed");

 
    const expires = new Date(Date.now() + 10 * 60 * 1000);

   
     await UserRepositories.saveResetPasswordToken(user, {
      resetPasswordToken: hashedResetToken,
      resetPasswordExpiresAt: expires,
    });

 const resetLink = `http://localhost:5173/reset-Password/${resetToken}`;

    return {
      resetToken,
      resetLink
    };
  },

 resetPassword: async ({ token, newPassword }) => {
    if (!token) throw new Error("Reset token missing");
    if (!newPassword) throw new Error("New password missing");


    const decode = await decodeResetPasswordToken(token);
    if (!decode) throw new Error("Invalid reset token");

    const user = await UserRepositories.findbyid(decode.id);
    if (!user) throw new Error("User not found");


    if (user.resetPasswordExpiresAt < new Date())
      throw new Error("Reset token expired");

  
    const isValid = await compareRefreshToken(
      token,
      user.resetPasswordToken
    );

    if (!isValid) throw new Error("Reset token not valid");

  
    const hashedNewPassword = await hashPassword(newPassword);
if(!hashedNewPassword) throw new Error("New Password didn't hashed")
 
    await UserRepositories.updatePassword(user, hashedNewPassword);

    await UserRepositories.clearResetPasswordToken(user);

    return {
      message: "Password reset successfully",
    };
  },


};

module.exports = AuthServices;
