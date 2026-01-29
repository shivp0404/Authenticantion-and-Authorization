const user = require("../auth/user.schema");

const UserRepositories = {
  findbyId: async (id) => {
    return user.findById(id).select("-password -refreshToken");
  },
  alluser: async () => {
    return await user.find().select("-password -refreshToken");
  },
};

module.exports = UserRepositories;
