const mongoose = require('mongoose')

const ConnectDb = (link)=>{
     try{
        mongoose.connect(link, {
//   tls: true,
//   tlsAllowInvalidCertificates: true
})
        console.log("Database Connected")
     }
     catch(err){
        console.error("Error connecting database",err);
        process.exit(1);
     }
}

module.exports = ConnectDb;