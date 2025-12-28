const AuthServices = require("./auth.services");

const AuthControllers = {
  register: async (req, res, next) => {
    try {
      const data = req.body;
      const user = await AuthServices.registration(data);
      res.status(201).json({ message: "User Created", data: user });
    } catch (err) {
      next(err);
    }
  },

  login: async (req, res, next) => {
    try {
      const data = req.body;
      const user = await AuthServices.login(data);
      
      res.cookie("RefreshToken", user.refreshToken, {
        httpOnly: true,
        secure: false, // true in production
        sameSite: "lax",
      });
      res
        .status(200)
        .json({
          success: true,
          message: "Login Successful",
          data: { accessToken: user.accessToken, data: user.data },
        });
    } catch (err) {
      next(err);
    }
  },
};

module.exports = AuthControllers;
