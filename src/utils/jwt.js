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
module.exports = {GenerateAccessToken,GenerateRefreshToken,VerifyUser,decodeRefreshToken}

