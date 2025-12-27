const mongoose = require('mongoose')

const ConnectDb = (link)=>{
     try{
        mongoose.connect(link)
        console.log("Database Connected")
     }
     catch(err){
        console.error("Error connecting database",err);
     }
}

module.exports = ConnectDb;