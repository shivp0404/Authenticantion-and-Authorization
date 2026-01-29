const profileServices = require("../userprofile/profile.services");

const ProfileControllers = {
  getprofile: async (req, res, next) => {
    try {
      const userprofile = await profileServices.userprofile(req.user.id);
      res
        .status(200)
        .json({
          success: true,
          message: "Get Profile data",
          data: { userprofile },
        });
    } catch (err) {
      next(err);
    }
  },
  getalluser: async (req, res, next) => {
    try {
      const user = await profileServices.alluser();
      res
        .status(200)
        .json({ success: true, message: "All user fetched", data: { user } });
    } catch (err) {
      next(err);
    }
  },
  updatePassword: async (req, res, next) => {
    try {
      const id = req.user.id
      const data = req.body
      const result = await profileServices.updatePassword(id,data);
      res
        .status(200)
        .json({success:true,message:result.message});
    } catch (err) {
      next(err);
    }
  },
};

module.exports = ProfileControllers;
