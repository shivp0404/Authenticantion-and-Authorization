const mongoose = require("mongoose");

const SessionSchema = new mongoose.Schema({
    user_id:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    refresh_token:{type:String},
    expiry_at:{type:Date,required:true},
    device:{type:String,required:true},
    ip:{type:String,required:true},
    is_revoked:{type:Boolean,default:false}
},
{
    timestamps:true
})

module.exports = mongoose.model("Session",SessionSchema)