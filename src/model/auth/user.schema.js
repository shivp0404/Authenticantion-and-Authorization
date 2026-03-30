const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
name:{type:String,require:true,unique:true,},
email:{type:String,require:true,unique:true},
password:{type:String,require:true,unique:true},
role:{type:String,default:'user'},
resetPasswordToken: {type: String,default: null},
resetPasswordExpiresAt: {type: Date,default: null},
},
{
    timestamps:true
})

module.exports = mongoose.model("User",UserSchema)