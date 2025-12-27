const AuthServices = require('./auth.services')

const AuthControllers = {
    register: async(req,res)=>{
         const data = req.body;
         const user = await AuthServices.registration(data);
         res.status(201).json({'message':'User Created','data':user})
    }
}

module.exports = AuthControllers;