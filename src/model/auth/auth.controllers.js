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
        secure: true,
        sameSite: "lax",
      });
      res.status(200).json({
        success: true,
        message: "Login Successful",
        data: { accessToken: user.accessToken, data: user.data },
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
        sameSite: "lax",
      });
      res.status(200).json({ success: true, message: user.message });
    } catch (err) {
      next(err);
    }
  },
  refresh: async (req, res, next) => {
    try {
      const result = await AuthServices.refresh(req.cookies.RefreshToken);
      res.cookie("RefreshToken", result.RefreshToken, {
        httpOnly: true,
        sameSite: "lax",
        secure: true,
      });
      res
        .status(200)
        .json({
          success: true,
          message: "Refresh the token",
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
