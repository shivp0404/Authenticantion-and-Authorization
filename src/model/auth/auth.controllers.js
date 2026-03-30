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
      const ip  = req.ip
      const device = req.headers["user-agent"];
      const data = req.body;
      const user = await AuthServices.login(data,ip,device);

      res.cookie("RefreshToken", user.refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });
      res.cookie("AccessToken", user.accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });
      res.status(200).json({
        success: true,
        message: "Login Successful",
        data:user.data ,
      });
    } catch (err) {
      next(err);
    }
  },
  logout: async (req, res, next) => {
    try {
      const token = req.cookies.RefreshToken;

      const user = await AuthServices.logout(token);
    
      res.clearCookie("RefreshToken", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });
        res.clearCookie("AccessToken",{
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });
      res.status(200).json({ success: true, message: user.message });
    } catch (err) {
       res.status(err.status || 400).json({
    message: err.message,
    remainingTime: err.remainingTime || null,
  });
    }
  },
  refresh: async (req, res, next) => {
    try {
      const result = await AuthServices.refresh(req.cookies.RefreshToken);
      res.cookie("RefreshToken", result.RefreshToken, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });
        res.cookie("AccessToken", result.AccessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });
      res
        .status(200)
        .json({
          success: true,
          message: "Refresh the token" || result.message,
          data: result.AccessToken,
        });
    } catch (err) {
      next(err);
    }
  },
  forgotPassword: async (req, res, next) => {
    try {
      const { email } = req.body;

      const result = await AuthServices.forgotPassword(email);

      res.status(200).json({
        success: true,
        message: "Reset password link sent successfully",
        data: result,
      });
    } catch (err) {
      next(err);
    }
  },
  resetPassword: async (req, res, next) => {
    try {
      const token = req.params.token
      const  newPassword  = req.body.password;
      

      const result = await AuthServices.resetPassword({
        token,
        newPassword,
      });

      res.status(200).json({
        success: true,
        message: result.message,
      });
    } catch (err) {
      next(err);
    }
  },
};

module.exports = AuthControllers;
