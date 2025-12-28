const bcrypt = require('bcrypt')


const hashPassword = (password)=>{
    return bcrypt.hash(password,10)
}
const hashRefreshToken = (token)=>{
    return bcrypt.hash(token,10)
}

const comparePassword = (password,dbpassword)=>{
    return bcrypt.compare(password,dbpassword)
}
const compareRefreshToken = (refreshtoken,dbrefreshtoken)=>{
    return bcrypt.compare(refreshtoken,dbrefreshtoken)
}



module.exports = {hashPassword,hashRefreshToken,comparePassword,compareRefreshToken};