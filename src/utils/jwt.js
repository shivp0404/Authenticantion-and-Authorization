const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()


const GenerateAccessToken= (data)=>{
   return jwt.sign(data,process.env.AccessTokenSecret,{expiresIn:60})
}

const GenerateRefreshToken= (data)=>{
   return jwt.sign(data,process.env.RefreshTokenSecret,{expiresIn:'1hr'})
}

const VerifyUser = (token)=>{
   return jwt.verify(token,process.env.AccessTokenSecret)
}

const decodeRefreshToken = (token)=>{
   return jwt.verify(token,process.env.RefreshTokenSecret)
}
const GenerateResetPasswordToken = async (payload) => {
  return jwt.sign(payload, process.env.RESET_PASSWORD_SECRET, {
    expiresIn: "10m", // ✅ small expire time
  });
};

const decodeResetPasswordToken = async (token) => {
  return jwt.verify(token, process.env.RESET_PASSWORD_SECRET);
};
module.exports = {GenerateResetPasswordToken,decodeResetPasswordToken,GenerateAccessToken,GenerateRefreshToken,VerifyUser,decodeRefreshToken}

