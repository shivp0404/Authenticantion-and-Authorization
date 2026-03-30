const HandleError = (err,req,res,next)=>{
  console.error("Error:",err.message)
  res.status(500).json({success:false,message:err.message,data:err.data||[]})
}

module.exports = HandleError;